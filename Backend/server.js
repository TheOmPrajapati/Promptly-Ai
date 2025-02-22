const express = require('express');
const dotenv = require('dotenv');
const passport = require('passport');
const connectDB = require('./config/db');
const session = require('express-session');
const userRoutes = require('./Routes/userRoutes');
const chatRoutes = require('./Routes/chatRoutes');
const authRoutes = require('./Routes/authRoutes');
const cors = require('cors');
require('dotenv').config();
connectDB();
require('./Config/googleAuth');
const app = express();


// Session Middleware
app.use(
    session({
        secret: '@H7fg!eZ82?Lo%Racv123&io*QsP$46lqTxWm&n9^UbK!', // Replace with a strong secret for production
        resave: false,
        saveUninitialized: false,
    })
);

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // Allows cookies or headers to be passed with the request
}));

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`); // Logs incoming request method and URL
    next();
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/chats/', chatRoutes);
app.use(passport.initialize());
app.use(passport.session());
app.use(authRoutes);

// Google OAuth route
app.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        // On success, create a token and send it to the frontend
        const token = generateAuthToken(req.user); // Replace with your token generation logic
        res.redirect(`http://localhost:3000?token=${token}`);
    }
);

app.get('/test', (req, res) => {
    res.status(200).send('Server is running!');
});


app.get('/', (req, res) => {
    res.send('Server is up and running!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
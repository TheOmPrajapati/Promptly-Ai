const express = require('express');
const dotenv = require('dotenv');
const passport = require('passport');
const connectDB = require('./config/db');
const session = require('express-session');
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors'); 
require('dotenv').config();
connectDB();
require('./Config/googleAuth');

const app = express();
app.use(cors()); 

// Session Middleware
app.use(
    session({
        secret: '@H7fg!eZ82?Lo%Racv123&io*QsP$46lqTxWm&n9^UbK!', // Replace with a strong secret for production
        resave: false,
        saveUninitialized: false,
    })
);

app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/chats', chatRoutes);
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

// Callback route
app.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }), // Handle failure
    (req, res) => {
        // Successful authentication
        // Redirect to frontend or send a token
        res.redirect('http://localhost:3000'); // Replace with your frontend's dashboard route
    }
);

app.get('/', (req, res) => {
    res.send('Server is up and running!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../Models/User');

passport.use(
    new GoogleStrategy(
        {
            clientID: '1016154858200-mf81m96kkrvha6sj8mn0abraga2ndbdf.apps.googleusercontent.com',
            clientSecret: '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',
            callbackURL: 'http://localhost:5000/auth/google/callback',
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // Use the User model inside the callback
                let user = await User.findOne({ googleId: profile.id });
                if (!user) {
                    // Create a new user if not found
                    user = new User({
                        googleId: profile.id,
                        email: profile.emails[0].value,
                        name: profile.displayName,
                    });
                    await user.save();
                }
                return done(null, user);
            } catch (error) {
                console.error('Error in Google Strategy:', error);
                return done(error, null);
            }
        }
    )
);

passport.serializeUser((User, done) => {
    done(null, User.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, User);
    } catch (error) {
        done(error, null);
    }
});

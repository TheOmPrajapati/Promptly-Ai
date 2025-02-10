const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Redirect user to Google for login
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google callback route
router.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        const token = req.user.token; // Assuming token is available in user object
        res.redirect(`http://localhost:3000?token=${token}`); // Redirect to the frontend
    }
);

module.exports = router;
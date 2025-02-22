const express = require('express');
const router = express.Router();
const {registerUser, loginUser, forgotPassword, resetPassword } = require('../controllers/userController');
const { getUserProfile } = require('../Controllers/userController'); // Ensure correct path
const { protect } = require('../Middleware/authMiddleware'); // Middleware to protect routes

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.get('/profile', protect, getUserProfile);


module.exports = router;

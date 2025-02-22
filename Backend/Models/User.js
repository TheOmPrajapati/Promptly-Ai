const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // Not required for Google OAuth users
    googleId: { type: String }, // Add a field for Google ID
    resetOTP: { type: Number }, // Store the OTP
    resetOTPExpire: { type: Date }, // Expiration time for the OTP
});

// Check if the model already exists to avoid OverwriteModelError
const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
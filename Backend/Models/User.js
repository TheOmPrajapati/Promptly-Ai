const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // Not required for Google OAuth users
    googleId: { type: String }, // Add a field for Google ID
    resetToken: { type: String }, // Token for password reset
    resetTokenExpire: { type: Date }, // Expiry time for the token
});

// Check if the model already exists to avoid OverwriteModelError
const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
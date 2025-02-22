const mongoose = require('mongoose');

const chatSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User', // Reference to the User model
        },
        messages: [
            {
                role: {
                    type: String,
                    enum: ['user', 'assistant'],
                    required: true,
                },
                content: {
                    type: String,
                    required: true,
                },
            },
        ],
    },
    {
        timestamps: true, // Adds createdAt and updatedAt fields
    }
);

// Pre-save hook for validation (optional)
chatSchema.pre('save', function (next) {
    if (!this.messages || this.messages.length === 0) {
        this.messages = []; // Set messages to an empty array if not provided
    }
    next();
});

module.exports = mongoose.model('Chat', chatSchema);
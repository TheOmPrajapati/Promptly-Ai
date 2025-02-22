const mongoose = require('mongoose');
const Chat = require('../Models/Chat');

// Create a new chat
const createChat = async (req, res) => {
    const { userId, messages } = req.body;

    try {
        // Validate `userId` format
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid userId format' });
        }

        // Create the new chat
        const chat = await Chat.create({
            userId,
            messages: messages || [], // Default to an empty array if no messages provided
        });

        res.status(201).json(chat);
    } catch (error) {
        res.status(500).json({
            message: 'Error creating chat',
            error: error.message,
        });
    }
};

// Get chat history for a user
const getChatHistory = async (req, res) => {
    try {
        const { userId } = req.params;

        // Validate `userId` format
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid userId format' });
        }

        // Retrieve chat history
        const chatHistory = await Chat.find({ userId }).sort({ createdAt: -1 });

        if (chatHistory.length === 0) {
            return res.status(404).json({ message: 'No chat history found for this user' });
        }

        res.status(200).json({ chatHistory });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving chat history', error: error.message });
    }
};

module.exports = { createChat, getChatHistory };

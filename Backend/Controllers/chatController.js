const Chat = require('../Models/Chat'); // Import your Chat model

// Create a new chat
const createChat = async (req, res) => {
    const { userId, messages } = req.body;

    try {
        // Convert userId to ObjectId
        const objectId = mongoose.Types.ObjectId(userId);

        const chat = await Chat.create({
            userId: objectId,
            messages: messages,
        });

        res.status(201).json(chat);
    } catch (error) {
        res.status(400).json({
            message: 'Error creating chat',
            error: error.message,
        });
    }
};

// Get chat history for a user
const getChatHistory = async (req, res) => {
    try {
        const { userId } = req.params;

        const chatHistory = await Chat.find({ userId }).sort({ createdAt: -1 });

        res.status(200).json({ chatHistory });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving chat history', error: error.message });
    }
};

module.exports = { createChat, getChatHistory };

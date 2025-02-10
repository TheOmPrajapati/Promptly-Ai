const express = require('express');
const router = express.Router();
const { createChat, getChatHistory } = require('../controllers/chatController');
const { protect } = require('../middleware/authMiddleware');

router.post('/create', protect, createChat);

router.get('/chats', protect, (req, res) => {
    res.status(200).json({ message: 'Authorized access' });
});

module.exports = router;

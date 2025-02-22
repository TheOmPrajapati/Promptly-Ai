const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config(); // Load environment variables

// Initialize Google Generative AI Client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/chat', async (req, res) => {
    try {
        const { messages } = req.body; // Chat messages from frontend
        const latestMessage = messages[messages.length - 1]?.content || "No input provided";

        // Fetch the model (Gemini model here is 'gemini-2.0-flash')
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        // Generate content from the Gemini API
        const result = await model.generateContent(latestMessage);

        // Extract the response text
        const aiResponse = result.response.text();

        // Send the response back to the frontend
        res.status(200).json({ message: aiResponse });
    } catch (error) {
        console.error("Error in Gemini API request:", error.message || error);
        res.status(500).json({ error: "Failed to fetch response from Gemini API" });
    }
});

module.exports = router;

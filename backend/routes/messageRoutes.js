const express = require("express");
const cors = require("cors");
const router = express.Router();
const Message = require("../models/Message");

// Enable CORS
router.use(cors());

// Send a message
router.post("/messages", async (req, res) => {
  try {
    const { sender, receiver, text } = req.body;
    const conversationId = [sender, receiver].sort().join("_");

    const newMessage = new Message({
      sender,
      receiver,
      text,
      timestamp: new Date(),
      conversationId,
    });

    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: "Failed to send the message" });
  }
});


// Get chat messages between two users
router.get("/messages/:user1/:user2", async (req, res) => {
  const { user1, user2 } = req.params;
  const conversationId = [user1, user2].sort().join("_");

  try {
    const messages = await Message.find({ conversationId }).sort({ timestamp: 1 });

    if (messages.length === 0) {
      return res.status(404).json({ message: "No messages found between the users" });
    }

    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});


module.exports = router;

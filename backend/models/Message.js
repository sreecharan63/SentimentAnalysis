const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  sender: { type: String, required: true },
  receiver: { type: String, required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },

  // NEW: Add this line
  conversationId: { type: String, required: true },
});

module.exports = mongoose.model("Message", MessageSchema);

// models/Message.js
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group",
    required: true,
  },
  sender: {
    type: String, // email
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  time: {
    type: String, // Optional: store HH:MM AM/PM
    default: () => new Date().toLocaleTimeString(),
  }
}, {
  timestamps: true
});

export default mongoose.model("Message", messageSchema);

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
  content: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['text', 'image', 'file'],
    default: 'text'
  },
  readBy: [{
    type: String // array of email addresses
  }],
  time: {
    type: String, // Optional: store HH:MM AM/PM
    default: () => new Date().toLocaleTimeString(),
  }
}, {
  timestamps: true
});

// helps to fetch the messages of a group in reverse order
messageSchema.index({ groupId: 1, createdAt: -1 });
// helps to get the messages of a user
messageSchema.index({ sender: 1 });

export default mongoose.model("Message", messageSchema);

// routes/chatRoutes.js
import express from "express";
import Group from '../../models/chat/group.js';
import Message from '../../models/chat/message.js';

const router = express.Router();


router.get("/group/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const groups = await Group.find({ members: email });
    res.json(groups);
  } catch (err) {
    console.error("Error fetching groups:", err);
    res.status(500).json({ error: "Failed to fetch groups" });
  }
});

// Create a new group
router.post("/group", async (req, res) => {
  try {
    const { name, members } = req.body;
    const group = new Group({ name, members });
    await group.save();
    res.json(group);
  } catch (err) {
    console.error("Error creating group:", err);
    res.status(500).json({ error: "Failed to create group" });
  }
});

// Get messages of a group (not currently used in frontend)
router.get("/messages/:groupId", async (req, res) => {
  try {
    const messages = await Message.find({ groupId: req.params.groupId }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    console.error("Error fetching messages:", err);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

export default router;

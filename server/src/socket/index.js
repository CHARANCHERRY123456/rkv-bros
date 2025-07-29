import Message from "../models/chat/message.js";
import Group from "../models/chat/group.js";

const socketHandler = (io) => {
  io.on("connection", (socket) => {
    socket.on("joinGroup", async (groupId) => {
      try {
        socket.join(groupId);
        
        const history = await Message.find({ groupId }).sort({ createdAt: 1 });
        socket.emit("loadHistory", history);
      } catch (err) {
        console.error("Error joining group:", err);
      }
    });

    socket.on("sendMessage", async (data) => {
      const { groupId, sender, text, time } = data;

      try {
        // Create message with proper field mapping
        const newMessage = new Message({ 
          groupId, 
          sender, 
          content: text, // Map text to content field
          text: text,    // Keep for backward compatibility
          time 
        });
        await newMessage.save();

        io.to(groupId).emit("receiveMessage", newMessage);
      } catch (err) {
        console.error("Error sending message:", err);
      }
    });

    socket.on("disconnect", () => {
      // Socket disconnected
    });
  });
};

export default socketHandler;

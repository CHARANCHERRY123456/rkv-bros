import Message from "../models/chat/message.js";

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
        const newMessage = new Message({ 
          groupId, 
          sender, 
          content: text,
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

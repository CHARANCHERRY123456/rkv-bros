import Message from "../models/chat/message.js";
import Group from "../models/chat/group.js";

const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("🟢 Socket connected:", socket.id);

    socket.on("joinGroup", async (groupId) => {
      try {
        socket.join(groupId);
        console.log(`🟡 Joined group: ${groupId}`);
        
        const history = await Message.find({ groupId }).sort({ createdAt: 1 });
        socket.emit("loadHistory", history);
      } catch (err) {
        console.error("Error joining group:", err);
      }
    });

    socket.on("sendMessage", async (data) => {
      const { groupId, sender, text, time } = data;

      try {
        const newMessage = new Message({ groupId, sender, text, time });
        await newMessage.save();

        io.to(groupId).emit("receiveMessage", newMessage);
      } catch (err) {
        console.error("Error sending message:", err);
      }
    });

    socket.on("disconnect", () => {
      console.log("🔴 Socket disconnected:", socket.id);
    });
  });
};

export default socketHandler;

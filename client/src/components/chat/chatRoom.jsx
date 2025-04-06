// pages/ChatRoom.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "../contexts/AuthContext";
import { io } from "socket.io-client";
import envVars from '../../config/config.js';

const backendUrl = envVars.VITE_BASE_URL;
const socket = io(backendUrl, {
  withCredentials: true,
  transports: ["websocket"],
});

export default function ChatRoom() {
  const { user } = useAuth();
  const { groupId } = useParams();

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    if (!groupId || !user?.email) return;

    // Join the group room
    socket.emit("joinGroup", groupId);

    // Load history from server
    socket.on("loadHistory", (msgs) => {
      setMessages(msgs);
    });

    // Listen for real-time messages
    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    // Cleanup on unmount
    return () => {
      socket.off("receiveMessage");
      socket.off("loadHistory");
    };
  }, [groupId, user]);

  const handleSend = () => {
    if (!text.trim()) return;

    const data = {
      groupId,
      sender: user.email,
      text,
      time: new Date().toLocaleTimeString("en-US", { hour12: false }),
    };

    socket.emit("sendMessage", data);
    setText(""); // Clear input
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Group Chat</h2>

      <div className="bg-gray-100 h-96 p-4 overflow-y-scroll rounded shadow mb-4">
        {messages.map((msg, idx) => (
          <div key={idx} className="mb-3">
            <strong>{msg.sender}</strong>{" "}
            <span className="text-sm text-gray-500">({msg.time})</span>
            <p className="ml-4">{msg.text}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          className="flex-1 p-2 border rounded"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
}

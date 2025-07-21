// pages/ChatRoom.jsx
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import useAuth from "../contexts/AuthContext";
import { io } from "socket.io-client";
import envVars from '../../config/config.js';

const backendUrl = envVars.VITE_BASE_URL;
const socket = io(backendUrl, {
  withCredentials: true,
  transports: ["websocket"],
});

function ChatBubble({ msg, isOwn }) {
  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"} mb-2`}>
      <div
        className={`max-w-xs sm:max-w-md px-4 py-2 rounded-2xl shadow
          ${isOwn
            ? "bg-blue-600 text-white rounded-br-none"
            : "bg-gray-200 text-gray-900 rounded-bl-none"
          }`}
      >
        <div className="flex items-center gap-2 mb-1">
          <span className={`font-semibold text-xs ${isOwn ? "text-blue-100" : "text-blue-700"}`}>
            {msg.sender}
          </span>
          <span className="text-[10px] text-gray-400">{msg.time}</span>
        </div>
        <div className="break-words">{msg.text}</div>
      </div>
    </div>
  );
}

export default function ChatRoom() {
  const { user } = useAuth();
  const { groupId } = useParams();

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!groupId || !user?.email) return;

    socket.emit("joinGroup", groupId);

    socket.on("loadHistory", (msgs) => {
      setMessages(msgs);
      setLoading(false);
    });

    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    const loadingTimer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => {
      socket.off("receiveMessage");
      socket.off("loadHistory");
      clearTimeout(loadingTimer);
    };
  }, [groupId, user]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="sticky top-0 z-10 bg-white border-b px-4 py-3 flex items-center shadow-sm">
        <span className="text-lg font-bold text-blue-700">Group Chat</span>
        {/* Placeholder for group info/actions */}
      </div>

      <div className="flex-1 overflow-y-auto px-2 py-4 sm:px-8 sm:py-6 custom-scrollbar">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="text-gray-500">Loading messages...</span>
            </div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-400">
            No messages yet. Start the conversation!
          </div>
        ) : (
          messages.map((msg, idx) => (
            <ChatBubble
              key={idx}
              msg={msg}
              isOwn={msg.sender === user.email}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <form
        className="sticky bottom-0 bg-white border-t px-4 py-3 flex gap-2 items-center"
        onSubmit={e => {
          e.preventDefault();
          handleSend();
        }}
      >
        <textarea
          className="flex-1 resize-none p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          placeholder="Type a message..."
          value={text}
          rows={1}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleInputKeyDown}
          style={{ minHeight: "40px", maxHeight: "120px" }}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Send
        </button>
      </form>
    </div>
  );
}
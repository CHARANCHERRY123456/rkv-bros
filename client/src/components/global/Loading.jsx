import React, { useEffect, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';

const funMessages = [
  "💡 Did you know? The first computer bug was a real moth!",
  "⌛ Brewing some coffee in the server room...",
  "🚀 Launching the awesomeness...",
  "🐍 Python is loading... but JavaScript is jealous!",
  "💬 Fun Fact: React was built during a Facebook hackathon!",
  "🧠 Pro Tip: One DSA problem a day keeps the bugs away!",
];

const LoadingScreen = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const updateMessage = () => {
      const randomIndex = Math.floor(Math.random() * funMessages.length);
      setMessage(funMessages[randomIndex]);
    };

    updateMessage();
    const interval = setInterval(updateMessage, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white text-center px-4">
      <FaSpinner className="text-5xl text-blue-400 animate-spin mb-4" />
      <p className="text-2xl font-semibold mb-2">Loading something amazing...</p>
      <p className="text-sm italic max-w-md">{message}</p>
    </div>
  );
};

export default LoadingScreen;

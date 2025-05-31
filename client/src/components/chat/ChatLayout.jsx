import { useState } from "react";
import ChatSidebar from "./ChatSidebar";
import { useSidebar } from "./SidebarContext";

export default function ChatLayout({ children, activeGroup, onGroupSelect }) {
  const { sidebarOpen, setSidebarOpen } = useSidebar();

  return (
    <div className="min-h-screen h-screen w-full flex bg-gradient-to-br from-blue-50 to-white">
      <ChatSidebar onGroupSelect={onGroupSelect} activeGroup={activeGroup} />
      <div className="flex-1 h-full flex flex-col relative">
        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="absolute top-4 left-4 z-20 bg-blue-600 text-white rounded-full w-10 h-10 text-xl shadow hover:bg-blue-700 transition"
            aria-label="Show sidebar"
          >
            &#9776;
          </button>
        )}
        {children}
      </div>
    </div>
  );
}

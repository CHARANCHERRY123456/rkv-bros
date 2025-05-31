import { useState } from "react";
import ChatLayout from "./ChatLayout";
import { SidebarProvider } from "./SidebarContext";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

export default function ChatPage() {
  const [activeGroup, setActiveGroup] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // When a group is selected, navigate to its chat page
  const handleGroupSelect = (groupId) => {
    setActiveGroup(groupId);
    if (window.innerWidth < 640) {
      navigate(`/group/${groupId}`);
    }
  };

  return (
    <SidebarProvider>
      <ChatLayout activeGroup={activeGroup} onGroupSelect={handleGroupSelect}>
        {/* Render nested routes or chat content */}
        <Outlet />
      </ChatLayout>
    </SidebarProvider>
  );
}

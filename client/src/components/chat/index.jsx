import { useEffect, useState } from "react";
import axios from "axios";
import GroupChat from "./groupChat.jsx";
import useAuth from "../contexts/AuthContext.jsx";
import envVars from '../../config/config.js';

// Avatar component for group/user
function Avatar({ name }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  return (
    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-700 text-white font-bold shadow">
      {initials}
    </div>
  );
}

// Sidebar group item
function GroupItem({ group, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center w-full p-3 rounded-lg mb-2 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
        active
          ? "bg-blue-600 text-white shadow-lg"
          : "bg-white hover:bg-blue-50 text-gray-800"
      }`}
      aria-label={`Open group ${group.name}`}
    >
      <Avatar name={group.name} />
      <div className="ml-3 flex-1 text-left">
        <div className="font-semibold truncate">{group.name}</div>
        <div className="text-xs text-gray-500 truncate">{group.description || "No description"}</div>
      </div>
      {/* Placeholder for notifications */}
      {/* <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">2</span> */}
    </button>
  );
}

// Sidebar with search and add group (future ready)
function GroupSidebar({ groups, activeGroup, onSelectGroup }) {
  // Placeholder for search/add group
  return (
    <aside className="w-full sm:w-80 border-r bg-gradient-to-b from-blue-50 to-white p-4 flex flex-col h-full">
      <div className="flex items-center mb-6">
        <span className="text-2xl font-extrabold text-blue-700 tracking-tight">Groups</span>
        {/* <button className="ml-auto p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition" aria-label="Add group">
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </button> */}
      </div>
      {/* <input
        type="text"
        placeholder="Search groups..."
        className="mb-4 px-3 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
      /> */}
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-1">
        {groups.length === 0 ? (
          <p className="text-gray-400 text-center mt-10">No groups found.</p>
        ) : (
          groups.map((group) => (
            <GroupItem
              key={group._id}
              group={group}
              active={activeGroup === group._id}
              onClick={() => onSelectGroup(group._id)}
            />
          ))
        )}
      </div>
    </aside>
  );
}

// Main chat area with header
function ChatMain({ activeGroup, user, group }) {
  if (!activeGroup) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-white">
        <p className="text-gray-500 text-lg">Select a group to start chatting</p>
      </div>
    );
  }
  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Chat header */}
      <div className="flex items-center px-6 py-4 border-b bg-white shadow-sm">
        <Avatar name={group?.name || "Group"} />
        <div className="ml-3">
          <div className="font-bold text-blue-700">{group?.name}</div>
          <div className="text-xs text-gray-500">{group?.description || "Group chat"}</div>
        </div>
        {/* Placeholder for future group actions */}
        {/* <button className="ml-auto p-2 rounded-full hover:bg-blue-100 transition" aria-label="Group settings">
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
          </svg>
        </button> */}
      </div>
      {/* Chat body */}
      <div className="flex-1 min-h-0">
        <GroupChat
          groupId={activeGroup}
          userEmail={user.email}
          userName={user.name || "Anonymous"}
        />
      </div>
    </div>
  );
}

// Main chat page
export default function DynamicChatPage() {
  const { user } = useAuth();
  const [groups, setGroups] = useState([]);
  const [activeGroup, setActiveGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeGroupObj, setActiveGroupObj] = useState(null);

  // Fetch groups for the user
  useEffect(() => {
    if (!user?.email) {
      setGroups([]);
      setActiveGroup(null);
      setActiveGroupObj(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError("");
    axios
      .get(`${envVars.VITE_BASE_URL}/chat/groups/${user.email}`)
      .then((res) => {
        setGroups(res.data);
        setActiveGroup(res.data[0]?._id || null);
        setActiveGroupObj(res.data[0] || null);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load groups.");
        setGroups([]);
        setActiveGroup(null);
        setActiveGroupObj(null);
        setLoading(false);
      });
  }, [user?.email]);

  // Update active group object when activeGroup changes
  useEffect(() => {
    if (!activeGroup) {
      setActiveGroupObj(null);
      return;
    }
    const found = groups.find((g) => g._id === activeGroup);
    setActiveGroupObj(found || null);
  }, [activeGroup, groups]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-blue-100 to-white">
        <span className="text-blue-600 text-xl font-bold animate-pulse">Loading chat...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-blue-100 to-white">
        <span className="text-red-500 text-lg">{error}</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row h-screen bg-gradient-to-br from-blue-100 to-white">
      <div className="sm:w-80 w-full h-1/3 sm:h-full">
        <GroupSidebar
          groups={groups}
          activeGroup={activeGroup}
          onSelectGroup={setActiveGroup}
        />
      </div>
      <div className="flex-1 h-2/3 sm:h-full">
        <ChatMain activeGroup={activeGroup} user={user} group={activeGroupObj} />
      </div>
    </div>
  );
}

/* 
  Add this to your global CSS for custom scrollbar:
  .custom-scrollbar::-webkit-scrollbar { width: 8px; }
  .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
  .custom-scrollbar { scrollbar-width: thin; scrollbar-color: #cbd5e1 #f1f5f9; }
*/

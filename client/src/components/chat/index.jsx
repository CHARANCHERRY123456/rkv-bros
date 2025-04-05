import { useEffect, useState, useContext } from "react";
import axios from "axios";
import GroupChat from "./groupChat.jsx";
import useAuth from "../contexts/AuthContext.jsx";

export default function DynamicChatPage() {
  const { user } = useAuth();
  alert(user);
  const [groups, setGroups] = useState([]);
  const [activeGroup, setActiveGroup] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/chat/groups/${user.email}`)
      .then((res) => {
        setGroups(res.data);
        setActiveGroup(res.data[0]?._id);
      });
  }, [user.email]);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-1/4 border-r p-4 overflow-y-auto bg-white">
        <h2 className="text-xl font-bold mb-4 text-blue-600">My Groups</h2>
        {groups.map((group) => (
          <div
            key={group._id}
            onClick={() => setActiveGroup(group._id)}
            className={`p-2 rounded-lg cursor-pointer mb-2 ${
              activeGroup === group._id
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200"
            }`}
          >
            {group.name}
          </div>
        ))}
      </div>

      {/* Main Chat View */}
      <div className="flex-1">
        {activeGroup ? (
          <GroupChat
            groupId={activeGroup}
            userEmail={user.email}
            userName={user.name || "Anonymous"}
          />
        ) : (
          <p className="p-10 text-gray-600">Select a group to chat</p>
        )}
      </div>
    </div>
  );
}

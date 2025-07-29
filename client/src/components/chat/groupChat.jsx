// pages/GroupChat.js
import { useState, useEffect } from "react";
import EmailAutoComplete from "./EmailAutoComplete";
import axiosClient from "../../utils/axiosClient";
import useAuth from "../contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import envVars from '../../config/config.js';
import LoadingScreen from "../global/Loading";
const backendUrl = envVars.VITE_BASE_URL;

// Avatar for group (future: use group image)
function GroupAvatar({ name }) {
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

// Modal for creating a group
function CreateGroupModal({ show, onClose, onCreate, groupName, setGroupName, memberEmails, setMemberEmails }) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-2">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h3 className="text-2xl font-bold mb-6 text-blue-700">Create New Group</h3>
        <form onSubmit={onCreate} className="space-y-4">
          <input
            type="text"
            placeholder="Group name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            required
            className="w-full p-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <EmailAutoComplete
            value={memberEmails}
            onChange={setMemberEmails}
            excludeEmails={[]}
          />
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Group list item
function GroupListItem({ group, onClick }) {
  return (
    <li
      className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-100 to-blue-50 rounded-xl shadow hover:shadow-lg hover:scale-[1.02] cursor-pointer transition-all"
      onClick={onClick}
    >
      <GroupAvatar name={group.name} />
      <div className="flex-1 min-w-0">
        <div className="font-bold text-blue-800 truncate">{group.name}</div>
        <div className="text-xs text-gray-500 truncate">{group.description || "No description"}</div>
      </div>
    </li>
  );
}

export default function GroupChat() {
  const { user } = useAuth();
  const [groups, setGroups] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [memberEmails, setMemberEmails] = useState([]); // now array of selected options
  const [loading, setLoading] = useState(true);
  const [activeGroup, setActiveGroup] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch groups that user belongs to
  const fetchGroups = async () => {
    try {
      // Add cache busting parameter to avoid 304 responses
      const timestamp = new Date().getTime();
      const res = await axiosClient.get(`/chat/group/${user.email}?t=${timestamp}`);
      
      // Handle both old and new API response formats
      let groupsData;
      if (res.data && res.data.data && Array.isArray(res.data.data.groups)) {
        // New API format: { success, message, data: { groups: [...] } }
        groupsData = res.data.data.groups;
      } else if (Array.isArray(res.data)) {
        // Old API format: [...]
        groupsData = res.data;
      } else {
        groupsData = [];
      }
      
      setGroups(groupsData);
      setLoading(false);
      if (groupsData.length > 0 && !activeGroup) {
        setActiveGroup(groupsData[0]._id || groupsData[0].id);
      }
    } catch (err) {
      console.error("Error fetching groups:", err);
      setGroups([]); // Set empty array on error
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchGroups();
    }
    // eslint-disable-next-line
  }, [user.email]);

  const createTestGroups = async () => {
    try {
      await axiosClient.post(`/chat-legacy/test-groups/${user.email}`);
      fetchGroups(); // Refresh the groups list
    } catch (err) {
      console.error("Error creating test groups:", err);
    }
  };

  // Responsive: detect mobile
  const isMobile = window.innerWidth < 640;

  // On mobile, navigate to chat page on group click
  const handleGroupClick = (groupId) => {
    if (isMobile) {
      navigate(`/group/${groupId}`);
    } else {
      setActiveGroup(groupId);
    }
  };

  return (
    <div className="min-h-screen h-screen w-full flex bg-gradient-to-br from-blue-50 to-white">
      {loading && <LoadingScreen />}
      {/* Sidebar: Group List */}
      <div className="w-full sm:w-1/3 md:w-1/4 h-full bg-white border-r flex flex-col">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-extrabold text-blue-700 tracking-tight">
            Groups
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-600 text-white rounded-full w-12 h-12 text-2xl shadow-xl hover:bg-blue-700 flex items-center justify-center transition"
              aria-label="Create group"
            >
              +
            </button>
            <button
              onClick={createTestGroups}
              className="bg-green-600 text-white rounded-lg px-3 py-2 text-sm shadow-lg hover:bg-green-700 transition"
              aria-label="Create test groups"
            >
              Test
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          {!Array.isArray(groups) || groups.length === 0 ? (
            <p className="text-center text-gray-400 mt-10 text-lg">No groups yet</p>
          ) : (
            <ul className="space-y-3">
              {groups.map((group) => (
                <GroupListItem
                  key={group._id || group.id}
                  group={group}
                  onClick={() => handleGroupClick(group._id || group.id)}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
      {/* Main Chat Area */}
      {/* On mobile, don't show chat area */}
      {!isMobile && (
        <div className="flex-1 h-full flex flex-col">
          {activeGroup ? (
            // Lazy load chatRoom for the selected group (using route without layout)
            <iframe
              title="Chat"
              src={`/chat/${activeGroup}`}
              className="w-full h-full border-0"
              style={{ minHeight: "100%", minWidth: "100%" }}
            />
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400 text-xl">
              Select a group to start chatting
            </div>
          )}
        </div>
      )}
      <CreateGroupModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onCreate={async (e) => {
          e.preventDefault();
          const members = memberEmails.map(opt => opt.value);
          if (!members.includes(user.email)) members.push(user.email);
          try {
            await axiosClient.post(`/chat/group`, {
              name: groupName,
              members,
            });
            setGroupName("");
            setMemberEmails([]);
            setShowModal(false);
            fetchGroups();
          } catch (err) {
            alert("Failed to create group");
          }
        }}
        groupName={groupName}
        setGroupName={setGroupName}
        memberEmails={memberEmails}
        setMemberEmails={setMemberEmails}
      />
    </div>
  );
}

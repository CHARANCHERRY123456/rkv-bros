import { useState, useEffect } from "react";
import axiosClient from "../../utils/axiosClient";
import useAuth from "../contexts/AuthContext";
import GroupListItem from "./GroupListItem";
import CreateGroupModal from "./CreateGroupModal";
import LoadingScreen from "../global/Loading";
import { useSidebar } from "./SidebarContext";

export default function ChatSidebar({ onGroupSelect, activeGroup }) {
  const { user } = useAuth();
  const [groups, setGroups] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [memberEmails, setMemberEmails] = useState("");
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const { sidebarOpen, setSidebarOpen } = useSidebar();

  // Fetch groups that user belongs to
  const fetchGroups = async () => {
    setLoading(true);
    try {
      const res = await axiosClient.get(`/chat/groups/${user.email}`);
      
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

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    setCreating(true);
    const members = memberEmails
      .split(",")
      .map((m) => m.trim())
      .filter((m) => m);
    if (!members.includes(user.email)) members.push(user.email);
    try {
      await axiosClient.post(`/chat/groups`, {
        name: groupName,
        members,
      });
      setGroupName("");
      setMemberEmails("");
      setShowModal(false);
      fetchGroups();
    } catch (err) {
      alert("Failed to create group");
    }
    setCreating(false);
  };

  return (
    <aside className={`h-full bg-white border-r flex flex-col transition-all duration-300 ${sidebarOpen ? "w-full sm:w-1/3 md:w-1/4" : "w-0 overflow-hidden"}`}>
      <div className="flex items-center justify-between p-6 border-b">
        <h2 className="text-2xl font-extrabold text-blue-700 tracking-tight">
          Groups
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white rounded-full w-12 h-12 text-2xl shadow-xl hover:bg-blue-700 flex items-center justify-center transition disabled:opacity-50"
            aria-label="Create group"
            disabled={creating}
          >
            {creating ? <span className="animate-spin">+</span> : "+"}
          </button>
          <button
            onClick={() => setSidebarOpen(false)}
            className="bg-gray-200 text-gray-700 rounded-full w-10 h-10 text-xl ml-2 hover:bg-gray-300 transition"
            aria-label="Hide sidebar"
          >
            &lt;
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        {loading ? (
          <LoadingScreen />
        ) : !Array.isArray(groups) || groups.length === 0 ? (
          <p className="text-center text-gray-400 mt-10 text-lg">No groups yet</p>
        ) : (
          <ul className="space-y-3">
            {groups.map((group) => (
              <GroupListItem
                key={group._id || group.id}
                group={group}
                active={activeGroup === (group._id || group.id)}
                onClick={() => onGroupSelect(group._id || group.id)}
              />
            ))}
          </ul>
        )}
      </div>
      <CreateGroupModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onCreate={handleCreateGroup}
        groupName={groupName}
        setGroupName={setGroupName}
        memberEmails={memberEmails}
        setMemberEmails={setMemberEmails}
        creating={creating}
      />
    </aside>
  );
}

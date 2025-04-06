// pages/GroupChat.js
import { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import envVars from '../../config/config.js'
const backendUrl = envVars.VITE_BASE_URL;

export default function GroupChat() {
  const { user } = useAuth();
  const [groups, setGroups] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [memberEmails, setMemberEmails] = useState("");

  const navigate = useNavigate();

  // Fetch groups that user belongs to
  const fetchGroups = async () => {
    try {
      const res = await axios.get(`${backendUrl}/chat/group/${user.email}`);
      setGroups(res.data);
      console.log("✅ Loaded groups:", res.data);
    } catch (err) {
      console.error("❌ Error loading groups", err);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, [user.email]);

  const handleCreateGroup = async (e) => {
    e.preventDefault();

    const members = memberEmails
      .split(",")
      .map((m) => m.trim())
      .filter((m) => m); // remove empty strings

    if (!members.includes(user.email)) members.push(user.email);

    try {
      const res = await axios.post(`${backendUrl}/chat/group`, {
        name: groupName,
        members,
      });

      console.log("✅ Created group:", res.data);

      setGroupName("");
      setMemberEmails("");
      setShowModal(false);

      // Refresh group list
      fetchGroups();
    } catch (err) {
      console.error("❌ Failed to create group", err);
      alert("Failed to create group");
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto relative">
      <h2 className="text-2xl font-bold text-center mb-6">Your Groups</h2>

      {groups.length === 0 ? (
        <p className="text-center text-gray-500">No groups yet</p>
      ) : (
        <ul className="space-y-3">
          {groups.map((group) => (
            <li
              key={group._id}
              className="p-4 bg-gray-100 rounded shadow hover:bg-blue-100 cursor-pointer"
              onClick={() => navigate(`/group/${group._id}`)}
            >
              {group.name}
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white rounded-full w-14 h-14 text-3xl shadow-xl hover:bg-blue-700"
      >
        +
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Create New Group</h3>

            <form onSubmit={handleCreateGroup}>
              <input
                type="text"
                placeholder="Group name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                required
                className="w-full p-2 mb-3 border rounded"
              />

              <textarea
                placeholder="Member emails (comma separated)"
                value={memberEmails}
                onChange={(e) => setMemberEmails(e.target.value)}
                rows={3}
                required
                className="w-full p-2 mb-3 border rounded"
              ></textarea>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import useAuth from "../contexts/AuthContext";
import LoadingScreen from "../global/Loading";
import { useGroups } from "./hooks/useGroups";
import GroupSidebar from "./components/GroupSidebar";
import ChatArea from "./components/ChatArea";
import CreateGroupModal from "./components/CreateGroupModal";

export default function GroupChat() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { groups, loading, activeGroup, setActiveGroup, createGroup } = useGroups(user?.email);
  
  const [showModal, setShowModal] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [memberEmails, setMemberEmails] = useState([]);

  const isMobile = window.innerWidth < 640;

  const handleGroupClick = (groupId) => {
    if (isMobile) {
      navigate(`/group/${groupId}`);
    } else {
      setActiveGroup(groupId);
    }
  };

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    // opt.value gives email and opt.label gives the name
    const members = memberEmails.map(opt => opt.value);
    if (!members.includes(user.email)) members.push(user.email);
    
    const success = await createGroup(groupName, members);
    if (success) {
      setGroupName("");
      setMemberEmails([]);
      setShowModal(false);
    } else {
      toast.error("Failed to create group");
    }
  };

  return (
    <div className="min-h-screen h-screen w-full flex bg-gradient-to-br from-blue-50 to-white">
      {loading && <LoadingScreen />}
      
      <GroupSidebar
        groups={groups}
        onGroupClick={handleGroupClick}
        onCreateClick={() => setShowModal(true)}
      />
      
      <ChatArea activeGroup={activeGroup} isMobile={isMobile} />
      
      <CreateGroupModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onCreate={handleCreateGroup}
        groupName={groupName}
        setGroupName={setGroupName}
        memberEmails={memberEmails}
        setMemberEmails={setMemberEmails}
      />
    </div>
  );
}

import { useState, useEffect } from "react";
import axiosClient from "../../../utils/axiosClient";

export const useGroups = (userEmail) => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeGroup, setActiveGroup] = useState(null);

  const fetchGroups = async () => {
    if (!userEmail) return;
    
    try {
      const res = await axiosClient.get(`/chat/groups/${userEmail}`);
      
      let groupsData;
      if (res.data && res.data.data && Array.isArray(res.data.data.groups)) {
        groupsData = res.data.data.groups;
      } else if (Array.isArray(res.data)) {
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
      setGroups([]);
      setLoading(false);
    }
  };

  const createGroup = async (groupName, memberEmails) => {
    try {
      await axiosClient.post(`/chat/groups`, {
        name: groupName,
        members: memberEmails,
      });
      await fetchGroups();
      return true;
    } catch (err) {
      console.error("Failed to create group:", err);
      return false;
    }
  };

  useEffect(() => {
    fetchGroups();
  }, [userEmail]);

  return {
    groups,
    loading,
    activeGroup,
    setActiveGroup,
    fetchGroups,
    createGroup
  };
};

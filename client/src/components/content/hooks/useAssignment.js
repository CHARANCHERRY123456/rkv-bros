import { useState, useEffect } from 'react';
import envVars from '../../../config/config.js'

const useAssignment = (assignmentName) => {
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const backendUrl=envVars.VITE_BASE_URL;

  const fetchAssignment = async () => {
    try {
      const response = await fetch(`${backendUrl}/assignments/${assignmentName}`);
      if (!response.ok) throw new Error('Assignment not found');
      const data = await response.json();
      setAssignment(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const submitVote = async (questionIndex, optionIndex , email) => {
    try {
      const response = await fetch(`${backendUrl}/assignments/${assignmentName}/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionIndex, optionIndex , email })
      });
      
      if (!response.ok) throw new Error('Vote failed');
      const updatedAssignment = await response.json();
      setAssignment(updatedAssignment);
      return true;
    } catch (err) {
      console.error('Voting error:', err);
      return false;
    }
  };

  useEffect(() => {
    fetchAssignment();
  }, [assignmentName]);

  return { 
    assignment,
    loading,
    error,
    submitVote,
    refetch: fetchAssignment
  };
};

export default useAssignment;
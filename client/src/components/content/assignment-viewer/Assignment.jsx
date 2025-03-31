import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useAssignment from '../hooks/useAssignment.js';
import AssignmentQuestionsList from './components/AssignmentQuestionsList.jsx';
import LoadingSpinner from '../shared/LoadingSpinner.jsx'; // Optional - create this component
import ErrorDisplay from '../shared/ErrorDisplay.jsx'; // Optional - create this component
import { toast } from 'react-hot-toast';
import InfoButton from './components/InfoButton.jsx';
import useAuth from '../../contexts/AuthContext.jsx';
import envVars from '../../../config/config.js';

const AssignmentViewer = () => {
  const {user} = useAuth();
  const { assignmentName } = useParams();
  const { 
    assignment, 
    loading, 
    error, 
    submitVote,
    refetch 
  } = useAssignment(assignmentName);


  // Handle vote submission
  const handleVote = async (questionIndex, optionIndex ) => {
    const email = user.email;
    if(email != envVars.VITE_ADMIN) return;
    const success = await submitVote(questionIndex, optionIndex ,email );
    if (success) {
      // Optional: Show success toast/message
      toast.success('Ayya mee votu veyyadam jariginadhi');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorDisplay 
        message={error.message}
        onRetry={refetch}
      />
    );
  }

  return (
    <div className="assignment-viewer-container">
      <div className="max-w-4xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Assignment Header */}
        <header className="mb-8 relative">
  <div className="flex justify-between items-start gap-4">
    <div className="flex-1 min-w-0">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 break-words">
        {assignment?.assignmentName}
      </h1>
      <div className="mt-2 text-sm text-gray-500">
        {assignment?.questions?.length} questions
      </div>
    </div>
    
    <div className="flex-shrink-0">
      <InfoButton />
    </div>
  </div>
</header>

        {/* Questions List */}
        <AssignmentQuestionsList 
          questions={assignment?.questions} 
          onVote={handleVote}
        />

        {/* Refresh Button */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={refetch}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Refresh Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignmentViewer;
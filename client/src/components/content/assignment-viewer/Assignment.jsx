import React from 'react';
import { useParams } from 'react-router-dom';
import useAssignment from '../hooks/useAssignment.js';
import AssignmentQuestionsList from './components/AssignmentQuestionsList.jsx';
import LoadingSpinner from '../shared/LoadingSpinner.jsx'; // Optional - create this component
import ErrorDisplay from '../shared/ErrorDisplay.jsx'; // Optional - create this component

const AssignmentViewer = () => {
  const { assignmentId } = useParams();
  const { 
    assignment, 
    loading, 
    error, 
    submitVote,
    refetch 
  } = useAssignment(assignmentId);

  // Handle vote submission
  const handleVote = async (questionIndex, optionIndex) => {
    const success = await submitVote(questionIndex, optionIndex);
    if (success) {
      // Optional: Show success toast/message
      console.log('Vote recorded successfully');
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
        <header className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 break-words">
            {assignment?.assignmentName}
          </h1>
          <div className="mt-2 text-sm text-gray-500">
            {assignment?.questions?.length} questions
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
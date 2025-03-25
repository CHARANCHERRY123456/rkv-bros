import React, { useState } from 'react';
import QuestionViewer from './QuestionViewer.jsx';

const AssignmentCard = ({ assignment, onVote }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  if (!assignment) return null;

  const currentQuestion = assignment.questions[currentQuestionIndex];

  return (
    <div className="assignment-card bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        {assignment.assignmentName}
      </h2>
      
      <QuestionViewer 
        question={currentQuestion} 
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={assignment.questions.length}
        onVote={onVote}
      />
      
      <div className="flex justify-between mt-6">
        <button
          onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
          disabled={currentQuestionIndex === 0}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50 transition-colors"
        >
          Previous
        </button>
        
        <span className="text-gray-600 self-center">
          Question {currentQuestionIndex + 1} of {assignment.questions.length}
        </span>
        
        <button
          onClick={() => setCurrentQuestionIndex(prev => Math.min(assignment.questions.length - 1, prev + 1))}
          disabled={currentQuestionIndex === assignment.questions.length - 1}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AssignmentCard;
import React from 'react';
import QuestionItem from './QuestionItem';

const AssignmentQuestionsList = ({ questions, onVote }) => {
  return (
    <div className="space-y-4">
      {questions?.map((question, index) => (
        <QuestionItem
          key={index}
          question={question}
          questionNumber={index + 1}
          onVote={onVote}
        />
      ))}
    </div>
  );
};

export default AssignmentQuestionsList;
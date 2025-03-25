import React, { useState } from 'react';
import VoteResults from './VoteResults.jsx';

const QuestionViewer = ({ question, questionNumber, totalQuestions, onVote }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);

  const handleSubmitVote = () => {
    if (selectedOption === null) return;
    onVote(questionNumber - 1, selectedOption);
    setHasVoted(true);
  };

  const resetSelection = () => {
    setSelectedOption(null);
    setHasVoted(false);
  };

  return (
    <div className="question-viewer">
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold text-lg text-gray-700 mb-2">
          Question {questionNumber}
        </h3>
        <p className="text-gray-800">{question.questionText}</p>
      </div>

      <div className="space-y-3 mb-6">
        {question.options.map((option, index) => (
          <div key={index} className="flex items-start">
            <input
              type="radio"
              id={`option-${index}`}
              name="options"
              className="mt-1 mr-2"
              checked={selectedOption === index}
              onChange={() => setSelectedOption(index)}
              disabled={hasVoted}
            />
            <label htmlFor={`option-${index}`} className="flex-1">
              <div className={`p-3 border rounded-lg transition-all ${
                hasVoted 
                  ? question.adminChoice === index 
                    ? 'border-green-300 bg-green-50' 
                    : 'border-gray-200'
                  : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
              }`}>
                <div className="flex justify-between items-center">
                  <span>{option.optionText}</span>
                  {hasVoted && (
                    <span className="text-sm text-gray-500">
                      {option.voteCount} votes
                    </span>
                  )}
                </div>
                {hasVoted && <VoteResults option={option} totalVotes={question.totalVotes} />}
              </div>
            </label>
          </div>
        ))}
      </div>

      {!hasVoted ? (
        <button
          onClick={handleSubmitVote}
          disabled={selectedOption === null}
          className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
        >
          Submit Vote
        </button>
      ) : (
        <div className="flex justify-between items-center">
          <span className="text-green-600">✓ Your vote has been recorded</span>
          <button
            onClick={resetSelection}
            className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800"
          >
            Change vote
          </button>
        </div>
      )}
    </div>
  );
};

export default QuestionViewer;
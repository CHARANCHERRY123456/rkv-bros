  import React, { useState } from 'react';

const QuestionItem = ({ question, questionNumber, onVote }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = async (optionIndex) => {
    if (hasVoted) return;
    
    const success = await onVote(questionNumber - 1, optionIndex);
    if (success) {
      setSelectedOption(optionIndex);
      setHasVoted(true);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6 border border-gray-100">
      <div className="flex items-start">
        <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex-shrink-0 flex items-center justify-center mr-3 mt-1">
          {questionNumber}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-medium text-gray-800 break-words">
            {question.questionText}
          </h3>
          {
            question.questionType == "numeric" &&
            <h1 className='m-5 text-black' > Answer : <span className='text-emerald-700 font-bold' >{question.adminChoice} </span></h1>
          }
          
          <div className="mt-3 space-y-2">
            {question.options.map((option, idx) => (
              <div 
                key={idx}
                onClick={() => handleVote(idx)}
                className={`p-3 rounded-lg cursor-pointer transition-all ${
                  hasVoted || question.adminChoice !== undefined
                    ? 'cursor-default'
                    : 'hover:bg-gray-50'
                } ${
                  question.adminChoice === idx
                    ? 'border-2 border-green-300 bg-green-50'
                    : selectedOption === idx
                      ? 'bg-blue-50'
                      : 'bg-gray-50'
                }`}
              >
                <div className="flex items-start">
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-800 break-words">{option.optionText}</p>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h1>{} </h1>
                  </div>
                  <div className="ml-3 flex-shrink-0 flex items-center space-x-2">
                    <span className="text-sm text-gray-500 whitespace-nowrap">
                      {option.voteCount} votes
                    </span>
                  </div>
                </div>
                
                {question.totalVotes > 0 && (
                  <div className="mt-2 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full"
                      style={{
                        width: `${Math.round((option.voteCount / question.totalVotes) * 100)}%`
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionItem;
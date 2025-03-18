import React, { useState } from "react";
import "./Poll.css";

const Poll = ({ folder }) => {
  const [responses, setResponses] = useState([]);

  const handleOptionClick = (questionIndex, optionIndex) => {
    const newResponses = [...responses];
    newResponses[questionIndex] = optionIndex;
    setResponses(newResponses);
  };

  return (
    <div className="poll-container">
      {folder.questions.map((question, qIndex) => {
        const selectedOption = responses[qIndex];
        const totalVotes = 1;

        return (
          <div key={qIndex} className="poll-question">
            <div className="question-text">
              {qIndex + 1}. {question.question}
            </div>
            <div className="options-container">
              {question.options.map((option, oIndex) => {
                const isSelected = selectedOption === oIndex;
                const percentage = isSelected ? "100%" : "0%";

                return (
                  <div
                    key={oIndex}
                    className={`option ${isSelected ? "selected" : ""}`}
                    onClick={() => handleOptionClick(qIndex, oIndex)}
                  >
                    {option}
                    <span className="percentage">{percentage}</span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Poll;

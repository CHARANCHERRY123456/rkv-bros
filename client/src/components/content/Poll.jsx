import React from "react";
import "./Poll.css";

const Poll = ({ questions }) => {
  return (
    <div className="poll-container">
      {questions.map((question, index) => (
        <div key={index} className="poll-question">
          {/* QUESTION NUMBER + TEXT */}
          <div className="question-text">
            {question.questionNumber}. {question.question}
          </div>

          {/* OPTIONS */}
          <div className="options-container">
            {question.options.map((option, idx) => {
              const isCorrect = Array.isArray(question.attemptedAnswer)
                ? question.attemptedAnswer.includes(option)
                : option === question.attemptedAnswer;

              return (
                <div
                  key={idx}
                  className={`option ${isCorrect ? "correct" : ""}`}
                >
                  {option}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Poll;

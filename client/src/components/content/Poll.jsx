import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Poll.css";

const Poll = ({ questions, assignmentId }) => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [voteCounts, setVoteCounts] = useState({});

  useEffect(() => {
    const initialCounts = {};
    questions.forEach((question) => {
      initialCounts[question._id] = question.responses.reduce((acc, res) => {
        acc[res.optionIndex] = res.count;
        return acc;
      }, {});
    });
    setVoteCounts(initialCounts);
  }, [questions]);

  const handleVote = async (questionIndex, optionIndex) => {
    try {
      await axios.post("http://localhost:3000/content/assignment/submit-response", {
        assignmentId,
        questionIndex,
        selectedOption: optionIndex,
      });
      
      setVoteCounts((prev) => {
        const updatedCounts = { ...prev };
        if (!updatedCounts[questionIndex]) updatedCounts[questionIndex] = {};
        updatedCounts[questionIndex][optionIndex] = (updatedCounts[questionIndex][optionIndex] || 0) + 1;
        return updatedCounts;
      });
      
      setSelectedAnswers((prev) => ({ ...prev, [questionIndex]: optionIndex }));
    } catch (error) {
      console.error("Error submitting response:", error);
    }
  };

  return (
    <div className="poll-container">
      {questions.map((question, index) => (
        <div key={index} className="poll-question">
          <div className="question-text">
            {question.questionNumber}. {question.question}
          </div>
          <div className="options-container">
            {question.options.map((option, idx) => {
              const isCorrect = Array.isArray(question.correctAnswer)
                ? question.correctAnswer.includes(option)
                : option === question.correctAnswer;
              const isSelected = selectedAnswers[index] === idx;
              const voteCount = voteCounts[index]?.[idx] || 0;
              const totalVotes = Object.values(voteCounts[index] || {}).reduce((a, b) => a + b, 0);
              const percentage = totalVotes ? ((voteCount / totalVotes) * 100).toFixed(1) : 0;

              return (
                <div
                  key={idx}
                  className={`option ${isCorrect ? "correct" : ""} ${isSelected ? "selected" : ""}`}
                  onClick={() => handleVote(index, idx)}
                >
                  {option} {isCorrect && <span className="admin-choice"> ✅</span>}
                  <span className="vote-percentage">({percentage}%)</span>
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

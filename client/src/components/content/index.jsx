import React, { useState } from "react"; // Import React and useState hook
import "./Poll.css"; // Import the CSS file for styling

const Content = () => {
  // Sample questions and choices
  const questions = [
    {
      id: 1,
      text: "What is your favorite programming language?",
      choices: ["JavaScript", "Python", "Java", "C++"],
    },
    {
      id: 2,
      text: "Which framework do you prefer for frontend development?",
      choices: ["React", "Vue", "Angular", "Svelte"],
    },
    {
      id: 2,
      text: "Which framework do you prefer for frontend development?",
      choices: ["React", "Vue", "Angular", "Svelte"],
    },
    {
      id: 2,
      text: "Which framework do you prefer for frontend development?",
      choices: ["React", "Vue", "Angular", "Svelte"],
    },
    {
      id: 2,
      text: "Which framework do you prefer for frontend development?",
      choices: ["React", "Vue", "Angular", "Svelte"],
    },
    {
      id: 2,
      text: "Which framework do you prefer for frontend development?",
      choices: ["React", "Vue", "Angular", "Svelte"],
    },
    // Add more questions here (up to 10)
  ];

  // State to track votes for each question
  const [votes, setVotes] = useState(
    questions.reduce((acc, question) => {
      acc[question.id] = {};
      return acc;
    }, {})
  );

  // Function to handle voting
  const handleVote = (questionId, choiceIndex) => {
    setVotes((prevVotes) => ({
      ...prevVotes,
      [questionId]: {
        ...prevVotes[questionId],
        [choiceIndex]: !prevVotes[questionId][choiceIndex], // Toggle vote
      },
    }));
  };

  // Function to calculate the percentage of votes for each choice
  const calculatePercentage = (questionId, choiceIndex) => {
    const totalVotes = Object.values(votes[questionId]).filter(Boolean).length;
    if (totalVotes === 0) return 0;
    const choiceVotes = votes[questionId][choiceIndex] ? 1 : 0;
    return ((choiceVotes / totalVotes) * 100).toFixed(0);
  };

  return (
    <div className="poll-container">
      {questions.map((question) => (
        <div key={question.id} className="question-container">
          <h2>Q{question.id}: {question.text}</h2>
          <div className="choices-container">
            {question.choices.map((choice, index) => (
              <div key={index} className="choice-item">
                <label className="choice-label">
                  <input
                    type="checkbox"
                    checked={votes[question.id][index] || false}
                    onChange={() => handleVote(question.id, index)}
                  />
                  <span className="choice-text">{choice}</span>
                </label>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${calculatePercentage(question.id, index)}%`,
                    }}
                  ></div>
                </div>
                <span className="percentage">
                  {calculatePercentage(question.id, index)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Content;

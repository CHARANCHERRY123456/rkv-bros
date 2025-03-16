import React, { useState } from "react"; // Import React and useState hook
import "./Poll.css"; // Import the CSS file for styling

const Poll = () => {
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
    // Add more questions here (up to 10)
  ];

  // State to track votes for each question
  const [votes, setVotes] = useState({});

  // Function to handle voting
  const handleVote = (questionId, choiceIndex) => {
    setVotes((prevVotes) => ({
      ...prevVotes,
      [questionId]: choiceIndex,
    }));
  };

  return (
    <div className="poll-container">
      <h1>Poll Questions</h1>
      {questions.map((question) => (
        <div key={question.id} className="question-container">
          <h2>{question.text}</h2>
          <div className="choices-container">
            {question.choices.map((choice, index) => (
              <button
                key={index}
                className={`choice-button ${
                  votes[question.id] === index ? "selected" : ""
                }`}
                onClick={() => handleVote(question.id, index)}
              >
                {choice}
              </button>
            ))}
          </div>
          <div className="vote-results">
            <strong>Votes:</strong>{" "}
            {votes[question.id] !== undefined
              ? question.choices[votes[question.id]]
              : "Not voted yet"}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Poll;

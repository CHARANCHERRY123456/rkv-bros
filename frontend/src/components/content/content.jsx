import React, { useState } from "react";
import "./Content.css"; // Import the CSS file for styling

const sampleQuestions = [
  {
    id: 1,
    text: "What is your favorite programming language?",
    choices: ["JavaScript", "Python", "Java", "C++"],
  },
  {
    id: 2,
    text: "Which frontend framework do you prefer?",
    choices: ["React", "Vue", "Angular", "Svelte"],
  },
];

const Content = () => {
  const [folders, setFolders] = useState(["Math", "Physics"]);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [tests, setTests] = useState(["Test1", "Test2"]);
  const [selectedTest, setSelectedTest] = useState(null);

  const [votes, setVotes] = useState(
    sampleQuestions.reduce((acc, question) => {
      acc[question.id] = {};
      return acc;
    }, {})
  );

  // Create folder
  const createFolder = () => {
    const folderName = prompt("Enter folder name:");
    if (folderName) setFolders([...folders, folderName]);
  };

  // Create test inside folder
  const createTest = () => {
    const testName = prompt("Enter test name:");
    if (testName) setTests([...tests, testName]);
  };

  const handleVote = (questionId, choiceIndex) => {
    setVotes((prevVotes) => ({
      ...prevVotes,
      [questionId]: {
        ...prevVotes[questionId],
        [choiceIndex]: !prevVotes[questionId][choiceIndex],
      },
    }));
  };

  const calculatePercentage = (questionId, choiceIndex) => {
    const totalVotes = Object.values(votes[questionId]).filter(Boolean).length;
    if (totalVotes === 0) return 0;
    const choiceVotes = votes[questionId][choiceIndex] ? 1 : 0;
    return ((choiceVotes / totalVotes) * 100).toFixed(0);
  };

  const goBack = () => {
    if (selectedTest) {
      setSelectedTest(null);
    } else if (selectedFolder) {
      setSelectedFolder(null);
    }
  };

  return (
    <div className="content-container">
      {selectedTest ? (
        <div>
          <button onClick={goBack} className="create-folder-button">⬅ Back to Tests</button>
          <h2 className="folder-title">{selectedTest}</h2>

          {/* Poll questions start */}
          {sampleQuestions.map((question) => (
            <div key={question.id} className="question-container">
              <h3 className="question-heading">
                Q{question.id}: {question.text}
              </h3>
              <div className="choices-container">
                {question.choices.map((choice, index) => (
                  <div key={index} className="choice-item">
                    <label>
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
                    <span className="percentage">{calculatePercentage(question.id, index)}%</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {/* Poll questions end */}
        </div>
      ) : selectedFolder ? (
        <div>
          <button onClick={goBack} className="create-folder-button">⬅ Back to Folders</button>
          <h2 className="folder-title">{selectedFolder}</h2>
          <button onClick={createTest} className="create-folder-button">+ Create Test</button>
          <div className="test-list">
            {tests.map((test, index) => (
              <div
                key={index}
                className="test-item"
                onClick={() => setSelectedTest(test)}
              >
                {test}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <button onClick={createFolder} className="create-folder-button">+ Create Folder</button>
          <div className="folder-grid">
            {folders.map((folder, index) => (
              <div
                key={index}
                className="folder-card"
                onClick={() => setSelectedFolder(folder)}
              >
                <div className="folder-title">{folder}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Content;

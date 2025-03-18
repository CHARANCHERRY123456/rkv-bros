import React, { useState } from "react";
import "./FolderList.css";
import Poll from "./Poll";
import questionsData from "./questions.json";

const FolderList = () => {
  const [subjects, setSubjects] = useState([
    {
      folderName: "Math",
      tests: [
        { folderName: "Test 1", questions: questionsData },
        { folderName: "Test 2", questions: questionsData },
      ],
    },
    {
      folderName: "Science",
      tests: [
        { folderName: "Test 1", questions: questionsData },
      ],
    },
  ]);

  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedTest, setSelectedTest] = useState(null);

  // BACK BUTTONS
  const handleBackToSubjects = () => {
    setSelectedSubject(null);
    setSelectedTest(null);
  };

  const handleBackToTests = () => {
    setSelectedTest(null);
  };

  // CLICK HANDLERS
  const handleSubjectClick = (subject) => {
    setSelectedSubject(subject);
  };

  const handleTestClick = (test) => {
    setSelectedTest(test);
  };

  // ADD NEW SUBJECT
  const handleAddSubjectFolder = () => {
    const folderName = prompt("Enter new subject folder name:");
    if (folderName) {
      const newSubject = {
        folderName,
        tests: [
          { folderName: "Test 1", questions: questionsData },
          { folderName: "Test 2", questions: questionsData },
        ],
      };
      setSubjects([...subjects, newSubject]);
    }
  };

  // ADD NEW TEST
  const handleAddTestFolder = () => {
    const folderName = prompt("Enter new test folder name:");
    if (folderName) {
      const updatedSubjects = subjects.map((subject) => {
        if (subject.folderName === selectedSubject.folderName) {
          const updatedTests = [
            ...subject.tests,
            { folderName, questions: questionsData },
          ];
          return { ...subject, tests: updatedTests };
        }
        return subject;
      });
      setSubjects(updatedSubjects);

      // Sync the selected subject in state to the updated one
      const updatedSelectedSubject = updatedSubjects.find(
        (subject) => subject.folderName === selectedSubject.folderName
      );
      setSelectedSubject(updatedSelectedSubject);
    }
  };

  // DYNAMIC HEADER
  const getHeaderTitle = () => {
    if (!selectedSubject && !selectedTest) return "My Subjects";
    if (selectedSubject && !selectedTest) return `${selectedSubject.folderName} - Tests`;
    if (selectedTest) return `${selectedTest.folderName} - Questions`;
  };

  return (
    <div className="folder-list-container">
      {/* DYNAMIC HEADER */}
      <h1 className="dynamic-header">{getHeaderTitle()}</h1>

      {/* SUBJECTS */}
      {!selectedSubject && (
        <>
          <div className="folders-grid">
            {subjects.map((subject, index) => (
              <div
                key={index}
                className="folder-icon"
                onClick={() => handleSubjectClick(subject)}
              >
                <div className="folder-image" />
                <div className="folder-name">{subject.folderName}</div>
              </div>
            ))}

            <div
              className="folder-icon add-folder"
              onClick={handleAddSubjectFolder}
            >
              <div className="folder-image add" />
              <div className="folder-name">+ New Folder</div>
            </div>
          </div>
        </>
      )}

      {/* TESTS */}
      {selectedSubject && !selectedTest && (
        <>
          <div className="content-header">
            <button className="back-button" onClick={handleBackToSubjects}>
              ⬅ Back
            </button>
          </div>

          <div className="folders-grid">
            {selectedSubject.tests.map((test, index) => (
              <div
                key={index}
                className="folder-icon"
                onClick={() => handleTestClick(test)}
              >
                <div className="folder-image" />
                <div className="folder-name">{test.folderName}</div>
              </div>
            ))}

            <div
              className="folder-icon add-folder"
              onClick={handleAddTestFolder}
            >
              <div className="folder-image add" />
              <div className="folder-name">+ New Folder</div>
            </div>
          </div>
        </>
      )}

      {/* QUESTIONS */}
      {selectedTest && (
        <>
          <div className="content-header">
            <button className="back-button" onClick={handleBackToTests}>
              ⬅ Back
            </button>
          </div>

          <div className="poll-section">
            <Poll folder={selectedTest} />
          </div>
        </>
      )}
    </div>
  );
};

export default FolderList;

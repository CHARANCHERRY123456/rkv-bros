import React, { useState } from "react";
import Poll from "./Poll";
import deepLearningQuestions from "./questionsDeepLearning.json";
import oosdQuestions from "./questionsOOSD.json";
import "./FolderList.css";

const FolderList = () => {
  const [subjects, setSubjects] = useState([
    {
      folderName: "Deep Learning",
      tests: [
        { folderName: "Week 8", questions: deepLearningQuestions },
      ],
    },
    {
      folderName: "OOSD",
      tests: [
        { folderName: "Week 8", questions: oosdQuestions },
      ],
    },
  ]);

  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedTest, setSelectedTest] = useState(null);

  const handleSubjectClick = (subject) => {
    setSelectedSubject(subject);
    setSelectedTest(null);
  };

  const handleTestClick = (test) => {
    setSelectedTest(test);
  };

  const handleAddSubjectFolder = () => {
    const folderName = prompt("Enter new subject name:");
    if (folderName) {
      const newSubject = {
        folderName,
        tests: [],
      };
      setSubjects([...subjects, newSubject]);
    }
  };

  const handleAddTestFolder = () => {
    const folderName = prompt("Enter new test folder name:");
    if (folderName && selectedSubject) {
      const updatedSubjects = subjects.map((subject) =>
        subject.folderName === selectedSubject.folderName
          ? {
              ...subject,
              tests: [
                ...subject.tests,
                { folderName, questions: [] }, // empty questions for now
              ],
            }
          : subject
      );
      setSubjects(updatedSubjects);
      setSelectedSubject(updatedSubjects.find(s => s.folderName === selectedSubject.folderName));
    }
  };

  const handleBackToSubjects = () => {
    setSelectedSubject(null);
    setSelectedTest(null);
  };

  const handleBackToTests = () => {
    setSelectedTest(null);
  };

  const getHeaderTitle = () => {
    if (!selectedSubject && !selectedTest) return "My Subjects";
    if (selectedSubject && !selectedTest) return `${selectedSubject.folderName} - Tests`;
    if (selectedTest) return `${selectedTest.folderName} - Questions`;
  };

  return (
    <div className="folder-list-container">
      <h1 className="dynamic-header">{getHeaderTitle()}</h1>

      {/* SUBJECTS VIEW */}
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
              <div className="folder-name">+ New Subject</div>
            </div>
          </div>
        </>
      )}

      {/* TESTS VIEW */}
      {selectedSubject && !selectedTest && (
        <>
          <div className="content-header">
            <button className="back-button" onClick={handleBackToSubjects}>⬅ Back</button>
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
              <div className="folder-name">+ New Test</div>
            </div>
          </div>
        </>
      )}

      {/* QUESTIONS VIEW */}
      {selectedTest && (
        <>
          <div className="content-header">
            <button className="back-button" onClick={handleBackToTests}>⬅ Back</button>
          </div>

          <Poll questions={selectedTest.questions} />
        </>
      )}
    </div>
  );
};

export default FolderList;

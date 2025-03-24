import React, { useState, useEffect } from "react";
import axios from "axios";
import Poll from "./Poll";
import "./FolderList.css";

const FolderList = () => {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedTest, setSelectedTest] = useState(null);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const response = await axios.get("http://localhost:3000/content/folder");
      setSubjects(response.data || []);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  const fetchTests = async (subject) => {
    try {
      const response = await axios.get(`http://localhost:3000/content/assignment?folder=${subject._id}`);
      console.log(response);
      setSelectedSubject({ ...subject, tests: response.data || [] });
    } catch (error) {
      console.error("Error fetching tests:", error);
    }
  };

  const handleSubjectClick = (subject) => {
    fetchTests(subject);
    setSelectedTest(null);
  };

  const handleTestClick = (test) => {
    setSelectedTest(test);
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
    if (selectedSubject && !selectedTest) return `${selectedSubject.name} - Tests`;
    if (selectedTest) return `${selectedTest.name} - Questions`;
  };

  return (
    <div className="folder-list-container">
      <h1 className="dynamic-header">{getHeaderTitle()}</h1>

      {/* SUBJECTS VIEW */}
      {!selectedSubject && (
        <div className="folders-grid">
          {subjects.map((subject) => (
            <div
              key={subject._id}
              className="folder-icon"
              onClick={() => handleSubjectClick(subject)}
            >
              <div className="folder-image" />
              <div className="folder-name">{subject.name}</div>
            </div>
          ))}
        </div>
      )}

      {/* TESTS VIEW */}
      {selectedSubject && !selectedTest && (
        <>
          <div className="content-header">
            <button className="back-button" onClick={handleBackToSubjects}>⬅ Back</button>
          </div>
          <div className="folders-grid">
            {selectedSubject.tests.map((test) => (
              <div
                key={test._id}
                className="folder-icon"
                onClick={() => handleTestClick(test)}
              >
                <div className="folder-image" />
                <div className="folder-name">{test.name}</div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* QUESTIONS VIEW */}
      {selectedTest && (
        <>
          <div className="content-header">
            <button className="back-button" onClick={handleBackToTests}>⬅ Back</button>
          </div>
          <Poll questions={selectedTest.questions} assignmentId={selectedTest._id} />
        </>
      )}
    </div>
  );
};

export default FolderList;
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
      setSubjects(response.data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  const fetchTests = async (subject) => {
    try {
      const response = await axios.get(`http://localhost:3000/content/assignment?folder=${subject._id}`);
      setSelectedSubject({ ...subject, tests: response.data });
    } catch (error) {
      console.error("Error fetching tests:", error);
    }
  };

  return (
    <div className="folder-list-container">
      {!selectedTest ? (
        <div className="folders-grid">
          {subjects.map((subject) => (
            <div key={subject._id} className="folder-icon" onClick={() => fetchTests(subject)}>
              {subject.name}
            </div>
          ))}
        </div>
      ) : (
        <Poll questions={selectedTest.questions} assignmentId={selectedTest._id} />
      )}
    </div>
  );
};

export default FolderList;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FolderList from "./FolderList";

const ContentComponent = () => {
  return (
    <Router>
      <Routes>
        {/* All subjects */}
        <Route path="/content" element={<FolderList />} />

        {/* Specific subject */}
        <Route path="/content/:subjectParam" element={<FolderList />} />

        {/* Specific test in subject */}
        <Route path="/content/:subjectParam/:testParam" element={<FolderList />} />
      </Routes>
    </Router>
  );
};

export default ContentComponent;

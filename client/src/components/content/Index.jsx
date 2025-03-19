import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FolderList from './components/content/FolderList';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FolderList />} />
        <Route path="/content" element={<FolderList />} />
        <Route path="/content/:subjectParam" element={<FolderList />} />
        <Route path="/content/:subjectParam/:testParam" element={<FolderList />} />
      </Routes>
    </Router>
  );
};

export default App;

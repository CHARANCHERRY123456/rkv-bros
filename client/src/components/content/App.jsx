import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FolderList from "./FolderList";
import DeepLearningPage from "./DeepLearningPage";
import OOSDPage from "./OOSDPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FolderList />} />
        <Route path="/deeplearning" element={<DeepLearningPage />} />
        <Route path="/oosd" element={<OOSDPage />} />
      </Routes>
    </Router>
  );
};

export default App;

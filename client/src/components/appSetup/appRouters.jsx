import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Content from '../../pages/Content';
import Analytics from '../../pages/Analytics';
import DashBoards from '../../pages/DashBoards';
import Home from '../../pages/Home';
import New from '../../pages/New';
import StudentProfile from '../global/StudentProfile';
import LoginPage from '../../pages/Login.jsx';
import SignupPage from '../auth/signup/signupComponent';
import ProtectedRoute from '../auth/protectedRoute.jsx';
import AssignmentViewer from '../content/assignment-viewer/Assignment';
const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* 🔹 Public Routes (No Layout) */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* 🔹 Protected Routes inside Layout */}
        <Route element={<Layout />}>
          <Route element={<ProtectedRoute />}>
            <Route index element={<Content />} />
            <Route path="/content" element={<Content />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/dashboards" element={<DashBoards />} />
            <Route path="/student/:sid" element={<StudentProfile />} />
            <Route path="/assignments/:assignmentName" element={<AssignmentViewer />} />
          </Route>
          <Route path="/new" element={<New />} />
          <Route path="/*" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;

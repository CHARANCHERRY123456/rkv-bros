import React from 'react';
import { Outlet } from 'react-router-dom';  // Outlet is used to render the child route components
import Navbar from './navbar';  // Example: Shared Navbar component
import Footer from './Footer.jsx';  // Example: Shared Footer component

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="content  h-screen">
          <Outlet />
      </div>
      {/* <Footer /> */}
    </div>

  );
};

export default Layout;
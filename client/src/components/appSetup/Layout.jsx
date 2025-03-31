import React from 'react';
import { Outlet } from 'react-router-dom';  // Outlet is used to render the child route components
import Navbar from './navbar'; 

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="content  h-screen">
          <Outlet />
      </div>
    </div>

  );
};

export default Layout;
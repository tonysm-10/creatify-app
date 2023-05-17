import React from 'react';
import Sidebar from '../Sidebar';
import Footer from '../Footer';

const Layout = ({ children }) => {
  return (
    <div>
      <Sidebar />
      <div className="main-content">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;

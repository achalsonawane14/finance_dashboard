import React from 'react';
import './Sidebar.css';

const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <h2 className="logo">MyFinance</h2>
      <nav className="nav">
        <a href="/dashboard">Dashboard</a>
        <a href="#">Analytics</a>
        <a href="#">Settings</a>
      </nav>
    </aside>
  );
};

export default Sidebar;

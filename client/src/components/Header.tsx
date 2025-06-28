import React from 'react';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <h1 className="header-title">Finance Dashboard</h1>
      <img
        className="avatar"
        src="https://thispersondoesnotexist.com/"
        alt="User"
      />
    </header>
  );
};

export default Header;
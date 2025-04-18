import React from 'react';
import '../../css/Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (

    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">KWHO</Link>
      </div>
      <div className="navbar-center">
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/game">Game</Link>
          </li>
          <li>
            <Link to="/database">Database</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
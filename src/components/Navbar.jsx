import React from 'react';
import './css/Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (

<nav className="navbar">
  <div className="navbar-left">
    <a href="/" className="logo">
      KWHO
    </a>
  </div>
  <div className="navbar-center">
    <ul className="nav-links">
      <li>
      <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/games">Games</Link>
      </li>
      <li>
        <Link to="/database">Database</Link>
      </li>
    </ul>
  </div>
</nav>
);
};

export default Navbar;
import React from 'react';
import './css/Navbar.css';

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
        <a href="/">Home</a>
      </li>
      <li>
        <a href="/games">Games</a>
      </li>
      <li>
        <a href="/database">Database</a>
      </li>
    </ul>
  </div>
</nav>
);
};

export default Navbar;
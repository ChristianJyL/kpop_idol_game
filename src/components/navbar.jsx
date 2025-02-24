import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (

<nav className="navbar">
  <div className="navbar-left">
    <a href="/" className="logo">
      Kwho
    </a>
  </div>
  <div className="navbar-center">
    <ul className="nav-links">
      <li>
        <a href="/truc">Home</a>
      </li>
      <li>
        <a href="/truc">Games</a>
      </li>
      <li>
        <a href="/truc">Database</a>
      </li>
    </ul>
  </div>
</nav>
);
};

export default Navbar;
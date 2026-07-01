import React from 'react';
import './Navbar.css';
import { Link, NavLink } from 'react-router';

function Navbar() {
  return (
   <nav className="navbar">
  <div className="navbar-left">

    <h2>Task Manager</h2>
  </div>

 <div className="navbar-links">
    <NavLink to="/" className="nav-btn">
  Dashboard
</NavLink>

<NavLink to="/tasks" className="nav-btn">
  All Tasks
</NavLink>  </div>

  <div className="navbar-right">
    <button className="logout-btn">
      Logout
    </button>
  </div>
</nav>
  )
}

export default Navbar

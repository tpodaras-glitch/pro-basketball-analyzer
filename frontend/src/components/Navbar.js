import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          🏀 Pro Basketball Analyzer
        </Link>

        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link to="/games" className="nav-link">Games</Link>
          </li>
          <li className="nav-item">
            <Link to="/value-bets" className="nav-link">Value Bets</Link>
          </li>
          <li className="nav-item">
            <Link to="/betting" className="nav-link">Betting</Link>
          </li>
          <li className="nav-item">
            <Link to="/bankroll" className="nav-link">Bankroll</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

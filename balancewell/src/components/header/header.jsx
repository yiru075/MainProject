import React from "react";
import { Link } from "react-router-dom";
import "./header.css";

const Header = () => {
  return (
    <header className="bw-header">
      <div className="logo">
        <span className="logo-highlight">BalanceWell</span>
      </div>
      <nav className="nav-menu">
        <ul>
          <li><Link to="/" className="active">Home</Link></li>
          <li><Link to="/sustainability">Sustainability</Link></li>
          <li><Link to="/housing">Housing</Link></li>
          <li><Link to="/education">Education</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

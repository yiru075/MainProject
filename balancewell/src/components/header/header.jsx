import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./header.css";

const Header = () => {
  const location = useLocation();

  return (
    <header className="bw-header">
      <div className="logo">
        <span className="logo-highlight">BalanceWell</span>
      </div>
      <nav className="nav-menu">
        <ul>
          <li>
            <Link to="/" className={location.pathname === "/" ? "active" : ""}>
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/sustainability"
              className={location.pathname === "/sustainability" ? "active" : ""}
            >
              Sustainability
            </Link>
          </li>
          <li>
            <Link
              to="/housing"
              className={location.pathname === "/housing" ? "active" : ""}
            >
              Housing
            </Link>
          </li>
          <li>
            <Link
              to="/education"
              className={location.pathname === "/education" ? "active" : ""}
            >
              Education
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

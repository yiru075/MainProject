import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";
import "./header.css";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const isAwarenessActive = 
    location.pathname === "/education" || 
    location.pathname === "/news" ||
    location.pathname === "/eduMenu" ||
    location.pathname.startsWith("/level");

  // Function to check level in localStorage and navigate accordingly
  const handleModulesClick = (e) => {
    e.preventDefault();
    const savedLevel = localStorage.getItem('userLevel');
    
    if (savedLevel) {
      // Navigate to education page if level is saved
      navigate('/education');
    } else {
      // Navigate to eduMenu if no level is saved
      navigate('/eduMenu');
    }
    
    setDropdownVisible(false);
  };

  return (
    <header className="bw-header">
      <div className="logo">
        <span className="logo-highlight">WellbeingHub</span>
      </div>
      <nav className="nav-menu">
        <ul>
          {/* <li>
            <Link to="/" className={location.pathname === "/" ? "active" : ""}>
              Home
            </Link>
          </li> */}
          
          {/*For Login Page  */}
          <li>
            <Link to="/home" className={location.pathname === "/home" ? "active" : ""}>
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
              to="/events"
              className={location.pathname === "/events" ? "active" : ""}
            >
              Events
            </Link>
          </li>
          <li>
            <Link
              to="/calculation"
              className={location.pathname === "/calculation" ? "active" : ""}
            >
              Calculator
            </Link>
          </li>
          <li className="dropdown-container">
            <div 
              className={`dropdown-trigger ${isAwarenessActive ? "active" : ""}`}
              onClick={toggleDropdown}
            >
              Awareness <DownOutlined className="dropdown-icon" />
            </div>
            {dropdownVisible && (
              <div className="dropdown-menu">
                <a 
                  href="#"
                  className={location.pathname === "/education" || location.pathname === "/eduMenu" || location.pathname.startsWith("/level") ? "active" : ""}
                  onClick={handleModulesClick}
                >
                  Modules
                </a>
                <Link 
                  to="/news" 
                  className={location.pathname === "/news" ? "active" : ""}
                  onClick={() => setDropdownVisible(false)}
                >
                  News
                </Link>
              </div>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { DownOutlined, MenuOutlined } from "@ant-design/icons";
import "./header.css";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(null);
  const [hoveringMenu, setHoveringMenu] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [themeColor, setThemeColor] = useState(localStorage.getItem("themeColor") || "#FFC107");

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
    document.documentElement.style.setProperty('--theme-color', themeColor);
    localStorage.setItem("themeColor", themeColor);
  }, [theme, themeColor]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const isAwarenessActive =
    location.pathname === "/education" ||
    location.pathname === "/news" ||
    location.pathname === "/eduMenu" ||
    location.pathname.startsWith("/level");

  const handleModulesClick = (e) => {
    e.preventDefault();
    const savedLevel = localStorage.getItem('userLevel');
    navigate(savedLevel ? '/education' : '/eduMenu');
    setDropdownVisible(null);
    setMenuOpen(false);
  };

  const handleDropdownClick = (menuKey) => {
    if (dropdownVisible === menuKey) {
      if (!hoveringMenu) {
        setDropdownVisible(null);
      }
    } else {
      setDropdownVisible(menuKey);
    }
  };

  return (
    <header className="bw-header">
      <div className="logo">
        <Link to="/home">
          <img src="/logo.png" alt="Safe and Settled Logo" className="logo-image" />
        </Link>
      </div>

      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        <MenuOutlined />
      </button>

      <nav className={`nav-menu ${menuOpen ? "open" : ""}`}>
        <ul>
          <li>
            <Link to="/home" className={location.pathname === "/home" ? "active" : ""} onClick={() => setMenuOpen(false)}>Home</Link>
          </li>

          <li className="dropdown-container">
            <div
              className={`dropdown-trigger ${["/sustainability", "/housing", "/calculation"].includes(location.pathname) ? "active" : ""}`}
              onClick={() => handleDropdownClick("planning")}
            >
              Planning <DownOutlined className="dropdown-icon" />
            </div>
            {dropdownVisible === "planning" && (
              <div
                className="dropdown-menu"
                onMouseEnter={() => setHoveringMenu(true)}
                onMouseLeave={() => {
                  setHoveringMenu(false);
                  setDropdownVisible(null);
                }}
              >
                <Link to="/sustainability" className={location.pathname === "/sustainability" ? "active" : ""} onClick={() => { setDropdownVisible(null); setMenuOpen(false); }}>Sustainability</Link>
                <Link to="/housing" className={location.pathname === "/housing" ? "active" : ""} onClick={() => { setDropdownVisible(null); setMenuOpen(false); }}>Housing</Link>
                <Link to="/calculation" className={location.pathname === "/calculation" ? "active" : ""} onClick={() => { setDropdownVisible(null); setMenuOpen(false); }}>Calculator</Link>
              </div>
            )}
          </li>

          <li>
            <Link to="/events" className={location.pathname === "/events" ? "active" : ""} onClick={() => setMenuOpen(false)}>Events</Link>
          </li>
          <li>
            <Link to="/retirementSupport" className={location.pathname === "/retirementSupport" ? "active" : ""} onClick={() => setMenuOpen(false)}>Retirement Support</Link>
          </li>

          <li className="dropdown-container">
            <div
              className={`dropdown-trigger ${isAwarenessActive ? "active" : ""}`}
              onClick={() => handleDropdownClick("awareness")}
            >
              Awareness <DownOutlined className="dropdown-icon" />
            </div>
            {dropdownVisible === "awareness" && (
              <div
                className="dropdown-menu"
                onMouseEnter={() => setHoveringMenu(true)}
                onMouseLeave={() => {
                  setHoveringMenu(false);
                  setDropdownVisible(null);
                }}
              >
                <a href="#" className={location.pathname === "/education" || location.pathname === "/eduMenu" || location.pathname.startsWith("/level") ? "active" : ""} onClick={handleModulesClick}>Modules</a>
                <Link to="/news" className={location.pathname === "/news" ? "active" : ""} onClick={() => { setDropdownVisible(null); setMenuOpen(false); }}>News</Link>
              </div>
            )}
          </li>

          <li>
            <button onClick={toggleTheme} className="theme-toggle-btn">
              {theme === "light" ? "Dark" : "Light"}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

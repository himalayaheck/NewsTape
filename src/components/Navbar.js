import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = ({ isDarkMode, toggleDarkMode }) => {
  const boxShadowStyle = {
    boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset',
  };

  const activeStyle = {
    fontWeight: 'bold',
    color: isDarkMode ? '#ffffff' : '#000000',
    borderBottom: `2px solid ${isDarkMode ? '#ffffff' : '#000000'}`,
  };

  return (
    <div>
      <nav
        className={`navbar fixed-top navbar-expand-lg ${
          isDarkMode ? 'navbar-dark bg-dark' : 'bg-body-tertiary'
        }`}
        style={boxShadowStyle}
      >
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            NewsTape
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="/navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/"
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/business"
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                >
                  Business
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/entertainment"
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                >
                  Entertainment
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/health"
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                >
                  Health
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/science"
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                >
                  Science
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/sports"
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                >
                  Sports
                </NavLink>
              </li>
             
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/technology"
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                >
                  Technology
                </NavLink>
              </li>
            </ul>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
                checked={isDarkMode}
                onChange={toggleDarkMode}
              />
              <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
                Dark Mode
              </label>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

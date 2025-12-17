import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../managers/authManager";
import "./NavBar.css";

export default function NavBar({ user, setUser }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      toggleMenu();
    }
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
    closeMenu();
    navigate("/");
  };

  return (
    <nav className="nav-container">
      <div className="navbar-links">
        <h1 className="logo">
          <Link to="/" className="navbar-brand" onClick={closeMenu}>
            <img src="/hntd-ghost.png" alt="HNTD" height="50" width="50" />
            <span className="logo-brand">HNTD</span>            
          </Link>
        </h1>

        <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
          <li>
            <Link className="nav-link" to="/" onClick={closeMenu}>Home</Link>
            <Link className="nav-link" to="/user-locations" onClick={closeMenu}>My Locations</Link>
            <Link className="nav-link" to="/favorites" onClick={closeMenu}>Favorites</Link>
          </li>
          <li className="nav-actions">
            <div className="user-dropdown">
              <button className="dropdown-toggle" onClick={toggleDropdown}>
                Welcome, {user.username} {isDropdownOpen ? "▲" : "▼"}
              </button>
              {isDropdownOpen && (
                <div className="dropdown-menu">
                  <Link to="/profile" className="dropdown-item" onClick={() => { setIsDropdownOpen(false); closeMenu(); }}>
                    Profile
                  </Link>
                  <button className="dropdown-item" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>           
          </li>
        </ul>
      </div>

      <div
        className="hamburger"
        onClick={toggleMenu}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-label="Toggle navigation menu"
      >
        <div className={`line ${isMenuOpen ? "open" : ""}`} />
        <div className={`line ${isMenuOpen ? "open" : ""}`} />
        <div className={`line ${isMenuOpen ? "open" : ""}`} />
      </div>
    </nav>
  );
}
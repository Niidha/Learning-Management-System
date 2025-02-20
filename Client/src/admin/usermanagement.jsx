import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUser, FaBars } from "react-icons/fa";
import UsersPage from "./UsersPage";

const UserPage = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <button onClick={() => setDrawerOpen(!drawerOpen)} className="menu-button">
        <FaUser />
        </button>
        <div className="navbar-title">Admin Dashboard</div>
        
      </nav>

      {/* Sidebar Drawer */}
      <div className={`sidebar ${drawerOpen ? "open" : ""}`}>
        <button onClick={() => setDrawerOpen(false)} className="close-button">
          &times;
        </button>
        <nav>
          <ul className="sidebar-menu">
            <li>
              <Link to="/admin-dashboard" className={location.pathname === "/admin-dashboard" ? "active" : ""}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/managecourse" className={location.pathname === "/managecourse" ? "active" : ""}>
                Course Management
              </Link>
            </li>
            <li>
              <Link to="/manageuser" className={location.pathname === "/manageuser" ? "active" : ""}>
                User Management
              </Link>
            </li>
            <li>
              <Link to="/report" className={location.pathname === "/report" ? "active" : ""}>
                View Report
              </Link>
            </li>
            <li>
              <Link to="/announcement" className={location.pathname === "/announcement" ? "active" : ""}>
                Announcement
              </Link>
            </li>
            <li className="logout-container">
              <button className="logout-button" onClick={logout}>
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <UsersPage />

      {/* ✅ Updated CSS */}
      <style>
        {`
          /* General Styles */
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          /* Navbar */
         .navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background-color: #343a40;
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000; /* ✅ Just below the sidebar */
}


          .navbar-title {
            font-size: 18px;
            font-weight: bold;
          }

          .menu-button,
          .profile-button {
            background: transparent;
            border: none;
            color: white;
            font-size: 20px;
            cursor: pointer;
          }

          /* Sidebar */
         .sidebar {
  position: fixed;
  top: 0;
  left: -260px;
  width: 250px;
  height: 100%;
  background-color: #343a40;
  color: white;
  padding: 20px;
  transition: 0.3s;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.5);
  z-index: 1050; /* ✅ Ensure it's above everything */
}


          .sidebar.open {
            left: 0;
          }

          .close-button {
            background: transparent;
            border: none;
            color: white;
            font-size: 24px;
            cursor: pointer;
            display: block;
            margin-bottom: 20px;
          }

          .sidebar nav ul {
            list-style: none;
            padding: 0;
          }

          .sidebar nav ul li {
            margin-bottom: 10px;
          }

          .sidebar nav ul li a {
            color: white;
            text-decoration: none;
            font-size: 16px;
          }

          .sidebar nav ul li a.active {
            color: #007bff;
            font-weight: bold;
          }

          .logout-button {
            background-color: #dc3545;
            color: white;
            border: none;
            padding: 8px 15px;
            border-radius: 5px;
            cursor: pointer;
            width: 100%;
          }

          /* Move logout below Announcement ONLY on small screens */
          @media (max-width: 768px) {
            .sidebar-menu {
              display: flex;
              flex-direction: column;
              gap: 10px;
            }

            .logout-container {
              margin-top: auto;
              padding-top: 15px;
            }
          }

          @media (min-width: 769px) {
            .logout-container {
              margin-top: 0;
            }
          }
        `}
      </style>
    </div>
  );
};

export default UserPage;

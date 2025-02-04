import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { api } from "../axios";
import toast from "react-hot-toast";

const UserPage = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const navBarStyle = {
    padding: '10px 20px',
    backgroundColor: '#343a40',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 999,
  };

  const buttonStyle = {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '10px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  const activeLinkStyle = {
    color: '#007bff',
    fontWeight: 'bold',
    textDecoration: 'none',
  };
  const logoutbuttonStyle = {
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    padding: '8px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
    position: 'absolute', // Position relative to the nearest positioned ancestor
    bottom: '10px',
    left: '10px'
  };
  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div>
      <div style={navBarStyle}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button
            onClick={() => setDrawerOpen(!drawerOpen)}
            style={{ ...buttonStyle, backgroundColor: 'transparent', color: '#fff', marginRight: '20px' }}
          >
            <FaUser style={{ marginRight: '8px' }} />
          </button>
        </div>
      </div>

      {drawerOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '250px',
            height: '100%',
            backgroundColor: '#343a40',
            color: '#fff',
            padding: '20px',
            zIndex: 999,
            boxShadow: '2px 0 5px rgba(0, 0, 0, 0.5)',
          }}
        >
          <button
            onClick={() => setDrawerOpen(false)}
            style={{
              backgroundColor: 'transparent',
              color: '#fff',
              border: 'none',
              fontSize: '20px',
              cursor: 'pointer',
              marginBottom: '20px',
            }}
          >
            &times;
          </button>
          <nav>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '10px' }}>
                <Link
                  to="/admin-dashboard"
                  style={location.pathname === "/admin-dashboard" ? activeLinkStyle : { color: '#fff', textDecoration: 'none' }}
                >
                 Home
                </Link>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <Link
                  to="/managecourse"
                  style={location.pathname === "/managecourse" ? activeLinkStyle : { color: '#fff', textDecoration: 'none' }}
                >
                  Course Management
                </Link>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <Link
                  to="/manageuser"
                  style={location.pathname === "/manageuser" ? activeLinkStyle : { color: '#fff', textDecoration: 'none' }}
                >
                  User Management
                </Link>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <Link
                  to="/report"
                  style={location.pathname === "/report" ? activeLinkStyle : { color: '#fff', textDecoration: 'none' }}
                >
                  View Report
                </Link>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <Link
                  to="/announcement"
                  style={location.pathname === "/announcement" ? activeLinkStyle : { color: '#fff', textDecoration: 'none' }}
                >
                  Announcement
                </Link>
              </li>
              <button style={logoutbuttonStyle} onClick={logout}>
          Logout
        </button>
            </ul>
          </nav>
        </div>
      )}

      <UsersPage />
    </div>
  );
};

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/admin/students");
        setUsers(response.data.users || []);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = (id) => {
    setUserToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      api.delete(`/admin/user/${userToDelete}`)
        .then(() => {
          setUsers(users.filter(user => user._id !== userToDelete));
          setShowDeleteModal(false);
          setUserToDelete(null);
          toast.success("User deleted successfully!");
        })
        .catch((err) => {
          console.error("Error deleting user:", err);
          toast.error("Failed to delete user!");
        });
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  return (
    <div style={pageStyles}>
      <h1 style={headingStyles}>Users</h1>
      <table style={tableStyles}>
        <thead>
          <tr style={tableHeaderStyles}>
            <th style={tableCellStyles}>Name</th>
            <th style={tableCellStyles}>Email</th>
            <th style={tableCellStyles}>Role</th>
            <th style={tableCellStyles}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={index} style={tableRowStyles}>
                <td style={tableCellStyles}>{user.name}</td>
                <td style={tableCellStyles}>{user.email}</td>
                <td style={tableCellStyles}>{user.role}</td>
                <td style={tableCellStyles}>
                  <button
                    onClick={() => handleDelete(user._id)}
                    style={deleteButtonStyles}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={tableCellStyles}>No users found</td>
            </tr>
          )}
        </tbody>
      </table>

      {showDeleteModal && (
        <div style={modalOverlayStyles}>
          <div style={modalContentStyles}>
            <h2 style={modalTitleStyles}>Confirm Deletion</h2>
            <p style={modalBodyStyles}>Are you sure you want to delete this user?</p>
            <div style={modalActionsStyles}>
              <button onClick={confirmDelete} style={modalConfirmButtonStyles}>Yes, Delete</button>
              <button onClick={cancelDelete} style={modalCancelButtonStyles}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const modalOverlayStyles = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const modalContentStyles = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '8px',
  maxWidth: '400px',
  width: '100%',
  textAlign: 'center',
};

const modalTitleStyles = {
  fontSize: '20px',
  marginBottom: '10px',
};

const modalBodyStyles = {
  fontSize: '16px',
  marginBottom: '20px',
};

const modalActionsStyles = {
  display: 'flex',
  justifyContent: 'space-around',
};

const modalConfirmButtonStyles = {
  backgroundColor: '#e74c3c',
  color: '#fff',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '5px',
  cursor: 'pointer',
};

const modalCancelButtonStyles = {
  backgroundColor: '#7f8c8d',
  color: '#fff',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '5px',
  cursor: 'pointer',
};

const pageStyles = {
  padding: "20px",
  fontFamily: "'Arial', sans-serif",
};

const headingStyles = {
  textAlign: "center",
  fontSize: "24px",
  marginBottom: "20px",
};

const tableStyles = {
  width: "80%",
  margin: "0 auto",
  borderCollapse: "collapse",
};

const tableHeaderStyles = {
  backgroundColor: "#007bff",
  color: "#fff",
  textAlign: "left",
  fontSize: "18px",
};

const tableCellStyles = {
  border: "1px solid #ddd",
  padding: "15px 25px",
  textAlign: "left",
  fontSize: "16px",
};

const tableRowStyles = {
  ":hover": {
    backgroundColor: "#f5f5f5",
  },
};

const deleteButtonStyles = {
  padding: "8px 15px",
  backgroundColor: "#e74c3c",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default UserPage;

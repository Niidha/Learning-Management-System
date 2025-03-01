import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { api } from "../axios";

const UsersPage = ({ isDrawerOpen }) => {
  const [users, setUsers] = useState([]);
  
  const [confirmDelete, setConfirmDelete] = useState(null); 

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
    setConfirmDelete(id); // Set the course to delete on confirmation
  };

  const confirmDeleteCourse = () => {
    api.delete(`/admin/user/${confirmDelete}`)
      .then(() => {
        setUsers(users.filter(user => user._id !== confirmDelete));
        toast.success("User deleted successfully!");
        setConfirmDelete(null); // Close the modal after confirmation
      })
      .catch((err) => {
        console.error("Error deleting user:", err);
        toast.error("Failed to delete user!");
      });
  };

  return (
    <div style={{ ...pageStyles, marginTop: isDrawerOpen ? "250px" : "80px" }}>
      <h1 style={headingStyles}>Users</h1>
      <div style={tableWrapperStyles}>
        <table style={tableStyles}>
          <thead>
            <tr>
              <th style={tableHeaderStyles}>Name</th>
              <th style={tableHeaderStyles}>Email</th>
              <th style={tableHeaderStyles}>Role</th>
              <th style={tableHeaderStyles}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id}>
                  <td style={tableCellStyles}>{user.name}</td>
                  <td style={tableCellStyles}>{user.email}</td>
                  <td style={tableCellStyles}>{user.role}</td>
                  <td style={tableCellStyles}>
                   
                    <button onClick={() => handleDelete(user._id)}  style={deleteButtonStyles}>Delete</button>
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
      </div>
      {confirmDelete && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3 className="text-lg font-bold mb-4">Are you sure you want to delete this course?</h3>
              <div className="flex">
                <button onClick={confirmDeleteCourse} className="btn-confirm">Confirm</button>
                <button onClick={() => setConfirmDelete(null)} className="btn-cancel">Cancel</button>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

const pageStyles = {
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  transition: "margin-top 0.3s ease-in-out",
};

const headingStyles = {
  fontSize: "24px",
  fontWeight: "bold",
  marginBottom: "20px",
  textAlign: "center",
  width: "100%",
};

const tableWrapperStyles = {
  width: "100%",
  overflowX: "auto",
  maxWidth: "100%",
};

const tableStyles = {
  width: "100%",
  borderCollapse: "collapse",
  border: "1px solid #ddd",
};

const tableHeaderStyles = {
  padding: "10px",
  backgroundColor: "#007bff",
  color: "white",
  border: "1px solid #ddd",
  textAlign: "center",
};

const tableCellStyles = {
  padding: "10px",
  border: "1px solid #ddd",
  textAlign: "center",
};

const deleteButtonStyles = {
  backgroundColor: "#dc3545",
  color: "#fff",
  border: "none",
  padding: "8px 12px",
  borderRadius: "5px",
  cursor: "pointer",
  width: "100%",
  maxWidth: "80px",
  fontSize: "14px",
};

export default UsersPage;

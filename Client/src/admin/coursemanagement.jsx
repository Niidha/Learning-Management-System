import { useState, useEffect } from "react";
import { api } from "../axios";
import { ToastContainer, toast } from "react-toastify";
import { FaHome, FaUser } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";

import "../css/managecourse.css";

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const [editCourse, setEditCourse] = useState(null);
  const [editedData, setEditedData] = useState({ title: "", provider: "", rating: "" });
  const [viewCourse, setViewCourse] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false); 

 
  const [confirmDelete, setConfirmDelete] = useState(null); 

  const location = useLocation(); 

  useEffect(() => {
    api.get("mycourses")
      .then((res) => setCourses(res.data))
      .catch((err) => console.error("Error fetching courses:", err));
  }, []);

  const handleDelete = (id) => {
    setConfirmDelete(id); // Set the course to delete on confirmation
  };

  const confirmDeleteCourse = () => {
    api.delete(`/delete-course/${confirmDelete}`)
      .then(() => {
        setCourses(courses.filter(course => course._id !== confirmDelete));
        toast.success("Course deleted successfully!");
        setConfirmDelete(null); // Close the modal after confirmation
      })
      .catch((err) => {
        console.error("Error deleting course:", err);
        toast.error("Failed to delete course!");
      });
  };

  const handleEdit = (course) => {
    setEditCourse(course._id);
    setEditedData({ title: course.title, provider: course.provider, rating: course.rating });
  };

  const handleUpdate = async () => {
    try {
      await api.patch(`/edit-course/${editCourse}`, editedData);
      setCourses(courses.map(course => course._id === editCourse ? { ...course, ...editedData } : course));
      setEditCourse(null); 
      toast.success("Course updated successfully!");
    } catch (err) {
      console.error("Error updating course:", err);
      toast.error("Failed to update course!");
    }
  };

  const handleView = (course) => {
    setViewCourse(course);
  };

  // Styles for navbar and button
  const navBarStyle = {
    backgroundColor: '#343a40',
    padding: '10px 20px',
    color: '#fff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 1000,
  };

  const buttonStyle = {
    padding: '10px 15px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
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

  // Active page styles
  const activeLinkStyle = {
    color: '#007bff', // Highlight text color for active page
    fontWeight: 'bold', // Make it bold for emphasis
  };
  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    navigate('/');
  };
  return (
    <div>
      {/* Navbar */}
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

      {/* Drawer */}
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

      {/* Course Management */}
      <div className="p-6" style={{ marginTop: '60px' }}>
        <h2 className="text-xl font-bold mb-4 text-center">Course Management</h2>
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Provider</th>
              <th className="p-2 border">Rating</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map(course => (
              <tr key={course._id} className="text-center border">
                <td className="p-2 border">{course.title}</td>
                <td className="p-2 border">{course.provider}</td>
                <td className="p-2 border">{course.rating}</td>
                <td className="p-2 border">
                  <button onClick={() => handleView(course)} className="btn-view px-3 py-1 mb-2 rounded mr-3">View</button>
                  <button onClick={() => handleEdit(course)} className="btn-edit px-3 py-1 mb-2 rounded mr-3">Edit</button>
                  <button onClick={() => handleDelete(course._id)} className="btn-delete px-3 mb-2 py-1 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {editCourse && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3 className="text-lg font-bold mb-4">Edit Course</h3>
              <label className="block mb-2">
                Title:
                <input
                  type="text"
                  className="input-field"
                  value={editedData.title}
                  onChange={(e) => setEditedData({ ...editedData, title: e.target.value })}
                />
              </label>
              <label className="block mb-2">
                Provider:
                <input
                  type="text"
                  className="input-field"
                  value={editedData.provider}
                  onChange={(e) => setEditedData({ ...editedData, provider: e.target.value })}
                />
              </label>
              <label className="block mb-4">
                Description:
                <input
                  type="text"
                  className="input-field"
                  value={editedData.description}
                  onChange={(e) => setEditedData({ ...editedData, description: e.target.value })}
                />
              </label>
              <div className="flex">
                <button onClick={handleUpdate} className="btn-update">Update</button>
                <button onClick={() => setEditCourse(null)} className="btn-cancel">Cancel</button>
              </div>
            </div>
          </div>
        )}

        {/* View Course Modal */}
        {viewCourse && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3 className="text-lg font-bold mb-4">Course Details</h3>
              <table className="modal-table">
                <tbody>
                  <tr>
                    <th>Title</th>
                    <td>{viewCourse.title}</td>
                  </tr>
                  <tr>
                    <th>Provider</th>
                    <td>{viewCourse.provider}</td>
                  </tr>
                  <tr>
                    <th>Description</th>
                    <td>{viewCourse.description}</td>
                  </tr>
                  <tr>
                    <th>Rating</th>
                    <td>{viewCourse.rating}</td>
                  </tr>
                </tbody>
              </table>
              <button onClick={() => setViewCourse(null)} className="btn-close"></button>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
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

      <ToastContainer />
    </div>
  );
};

export default CourseManagement;

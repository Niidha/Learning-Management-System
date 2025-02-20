import React, { useState, useEffect } from 'react';
import { api } from '../axios';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { FaEye, FaHome, FaPen, FaTrash, FaUser } from 'react-icons/fa';
import FeedbackModal from '../Pages/feedaback';

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const { username } = useSelector((state) => state.user || {});
  
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null); 

    const handleDelete = (id) => {
      setConfirmDelete(id); // Set the course to delete on confirmation
    };
    // const handleDelete = async (courseId) => {
    //   try {
    //     const response = await api.delete(`/delete-course/${courseId}`);
    //     toast.success(response.data.message);
    //     setCourses(courses.filter((course) => course._id !== courseId));
    //   } catch (err) {
    //     console.error('Error deleting course:', err);
    //     toast.error(err.response?.data?.message || err.message || 'An error occurred while deleting the course');
    //   }
    // };
  
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
  
    const navBarStyle = {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 20px',
      backgroundColor: '#343a40',
      color: '#fff',
      width: '100%',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 1000,
    };
  
    const buttonStyle = {
      backgroundColor: '#dc3545',
      color: '#fff',
      border: 'none',
      padding: '8px 15px',
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

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get(`/courses/provider/${username}`);
        setCourses(response.data);
      } catch (err) {
        console.error('Error fetching courses:', err);
      }
    };
    fetchCourses();
  }, [username]);

  const handleEdit = (courseId) => { 
    navigate(`/edit-course/${courseId}`);
  };


  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    navigate('/');
  };
  const toggleFeedbackModal = () => {
    setShowFeedbackModal(prev => !prev);
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

      <div className="d-flex align-items-center">
        <div className="me-3">
          <span style={{ fontWeight: 'bold' }}>Hello, {username}</span>
        </div>
       
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
          zIndex: '999',
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
              <Link to="/provider-dashboard" style={{ color: '#fff', textDecoration: 'none' }}>
                Home
              </Link>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <Link to="/create-course" style={{ color: '#fff', textDecoration: 'none' }}>
                Create Course
              </Link>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <Link to="/mycourses" style={{ color: '#fff', textDecoration: 'none' }}>
                My Courses
              </Link>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <button
                onClick={toggleFeedbackModal}
                style={{
                  backgroundColor: '#21D375',
                  color: '#fff',
                  border: 'none',
                  padding: '8px 15px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  width: '100%',
                }}
              >
                Feedback
              </button>
               <button style={logoutbuttonStyle} onClick={logout}>
          Logout
        </button>
            </li>
          </ul>
        </nav>
      </div>
    )}

    
    <FeedbackModal
      showModal={showFeedbackModal}
      handleClose={toggleFeedbackModal}
    />

      <h2>My Courses</h2>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          justifyContent: 'center',
          padding: '20px',
          paddingRight:"30%"
        }}
      >
        {courses.length === 0 ? (
          <p>No courses available. Please create a course.</p>
        ) : (
          courses.map((course) => (
            <div
              key={course._id}
              style={{
                width: '250px',
                height: '300px',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <img
                src={course.image}
                alt={course.title}
                style={{
                  width: '100%',
                  height: '150px',
                  objectFit: 'cover',
                  borderRadius: '5px',
                }}
              />
              <h3
                style={{
                  fontSize: '16px',
                  marginTop: '10px',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                }}
              >
                {course.title}
              </h3>
              <span
                style={{
                  fontSize: '14px',
                  color: '#6c757d',
                }}
              >
                Provider: {course.provider}
              </span>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: '10px',
                }}
              >
                <button
                  onClick={() => handleEdit(course._id)}
                  style={{
                 
                    color: 'black',
                    padding: '8px 15px',
                    borderRadius: '5px',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '14px',
                    textDecoration: 'none',
                  }}
                >
                 <FaPen/>
                </button>
                  <Link
                                  to={`/courses/${course._id}`}
                                  style={{
                                    display: 'block',
                                    marginTop: '10px',
                                    padding: '10px 10px',
                                   
                                    color: 'black',
                                    textDecoration: 'none',
                                    textAlign: 'center',
                                    borderRadius: '5px',
                                    fontSize: '20px',
                                  }}
                                >
                                 <FaEye/> 
                                </Link>
                <button
                  onClick={() => handleDelete(course._id)}
                  style={{
                    
                    color: 'black',
                    padding: '8px 15px',
                    borderRadius: '5px',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '14px',
                  }}
                >
             <FaTrash/>
                </button>
              </div>
            </div>
          ))
        )}
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

export default MyCourses;

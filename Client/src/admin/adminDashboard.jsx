import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { api } from '../axios';
import { useSelector } from 'react-redux';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { username } = useSelector((state) => state.user || {});

  const [courses, setCourses] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

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

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get('/mycourses');
        setCourses(response.data);
      } catch (err) {
        console.error('Error fetching courses:', err);
      }
    };
    fetchCourses();
  }, []);

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
            View Profile
          </button>
        </div>

        <div className="d-flex align-items-center">
          <div className="me-3">
            <span style={{ fontWeight: 'bold' }}>Hello, {username}</span>
          </div>
          <button style={buttonStyle} onClick={logout}>
            Logout
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
                <Link to="/managecourse" style={{ color: '#fff', textDecoration: 'none' }}>
                  Course Management
                </Link>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <Link to="/manageuser" style={{ color: '#fff', textDecoration: 'none' }}>
                  User Management
                </Link>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <Link to="/report" style={{ color: '#fff', textDecoration: 'none' }}>
                  View Report
                </Link>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <Link to="/announcement" style={{ color: '#fff', textDecoration: 'none' }}>
                  Announcement
                </Link>
              </li>
              
             
            </ul>
          </nav>
        </div>
      )}

      {/* Course List */}
      <div style={{ paddingTop: '80px', paddingBottom: '60px' }}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          {courses.map((course) => (
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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span
                  style={{
                    fontSize: '14px',
                    color: '#6c757d',
                  }}
                >
                  Provider: {course.provider}
                </span>
                {course.rating && (
                  <span
                    style={{
                      fontSize: '14px',
                      color: '#ffc107',
                    }}
                  >
                    Rating: {course.rating}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

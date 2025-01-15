import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import FeedbackModal from './feedaback';


const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false); // Manage modal visibility

  const navigate = useNavigate();
  const { username, id } = useSelector((state) => state.user || {});

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:7000/api/users/courses');
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

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* Navbar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px 20px',
          backgroundColor: '#343a40',
          color: '#fff',
          width: '100%',
          position: 'fixed',
          top: '0',
          left: '0',
          zIndex: '1000',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button
            onClick={() => setDrawerOpen(!drawerOpen)} // Toggle drawer
            style={{
              backgroundColor: 'transparent',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              marginRight: '20px',
              fontSize: '16px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <FaUser style={{ marginRight: '8px' }} />
            View Profile
          </button>
          <div style={{ position: 'relative', flexGrow: 1 }}>
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                maxWidth: '700px',
                padding: '8px 40px 8px 10px',
                borderRadius: '5px',
                border: '1px solid #ced4da',
              }}
            />
            <FiSearch
              style={{
                position: 'absolute',
                top: '50%',
                left: '90%',
                transform: 'translateY(-50%)',
                color: '#6c757d',
              }}
            />
          </div>
        </div>

        <div className="d-flex align-items-center">
          <div className="me-3">
            <span style={{ fontWeight: 'bold' }}>Hello, {username}</span>
          </div>
          <button
            style={{
              backgroundColor: '#dc3545',
              color: '#fff',
              border: 'none',
              padding: '8px 15px',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Side Drawer */}
      {drawerOpen && (
        <div
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
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
            onClick={() => setDrawerOpen(false)} // Close drawer
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
            <ul style={{ listStyle: 'none', padding: '0' }}>
              <li style={{ marginBottom: '10px' }}>
                <Link to="/view-profile" style={{ color: '#fff', textDecoration: 'none' }}>
                  View Profile
                </Link>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <Link to="/update-profile" style={{ color: '#fff', textDecoration: 'none' }}>
                  Update Profile
                </Link>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <Link to="/favourites" style={{ color: '#fff', textDecoration: 'none' }}>
                  Favourites
                </Link>
              </li>
              {/* Feedback as a Button */}
              <li style={{ marginBottom: '10px' }}>
                <button
                  onClick={() => setShowFeedbackModal(true)} // Open feedback modal on click
                  style={{
                    backgroundColor: '#21D375',
                    color: '#fff',
                    border: 'none',
                    padding: '8px 15px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    width: '100%',
                    textAlign: 'center',
                  }}
                >
                  Feedback
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}

      {/* Feedback Modal */}
      <FeedbackModal
        showModal={showFeedbackModal}
        handleClose={() => setShowFeedbackModal(false)} // Close the modal
      />

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
          {filteredCourses.map((course) => (
            <div
              key={course._id}
              style={{
                width: '250px',
                height: '350px',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                marginBottom: '20px',
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
              <Link
                to={`/courses/${course._id}`}
                style={{
                  display: 'block',
                  marginTop: '10px',
                  padding: '8px 15px',
                  backgroundColor: '#21D375',
                  color: '#fff',
                  textDecoration: 'none',
                  textAlign: 'center',
                  borderRadius: '5px',
                  fontSize: '14px',
                }}
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseList;

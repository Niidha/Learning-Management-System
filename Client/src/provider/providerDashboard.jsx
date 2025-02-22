import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { api } from '../axios';
import FeedbackModal from '../Pages/feedaback';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const ProviderDashboard = () => {
  const navigate = useNavigate();
  const { username } = useSelector((state) => state.user || {}); 

  const [courses, setCourses] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get('users/courses');
        
        const userCourses = response.data.map(course => ({
          ...course,
          isUserCourse: course.provider === username, 
        }));
        setCourses(userCourses);
      } catch (err) {
        console.error('Error fetching courses:', err);
      }
    };
    fetchCourses();
  }, [username]); // Run effect when the username changes

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleViewClick = (courseProvider) => {
    if (username !== courseProvider) {
      toast.error('Not Authorized!');
    }
  };

  const toggleFeedbackModal = () => {
    setShowFeedbackModal(prev => !prev);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 20px', backgroundColor: '#343a40', color: '#fff', position: 'fixed', top: 0, left: 0, width: '100%' }}>
        <button onClick={() => setDrawerOpen(!drawerOpen)} style={{ backgroundColor: 'transparent', color: '#fff', marginRight: '20px' }}>
          <FaUser />
        </button>
        <div>
          <span style={{ fontWeight: 'bold', padding:"10px"}}>Hello, {username}</span>
          <button onClick={logout} style={{ backgroundColor: '#dc3545', color: '#fff', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer' }}>Logout</button>
        </div>
      </div>

      {drawerOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '250px', height: '100%', backgroundColor: '#343a40', color: '#fff', padding: '20px' }}>
          <button onClick={() => setDrawerOpen(false)} style={{ backgroundColor: 'transparent', color: '#fff', border: 'none', fontSize: '20px', cursor: 'pointer' }}>&times;</button>
          <nav>
            <ul>
              <li><Link to="/create-course" style={{ color: '#fff', textDecoration: 'none' }}>Create Course</Link></li>
              <li><Link to="/mycourses" style={{ color: '#fff', textDecoration: 'none' }}>My Courses</Link></li>
              <li><button onClick={toggleFeedbackModal} style={{ backgroundColor: '#21D375', color: '#fff', border: 'none', padding: '8px 15px', cursor: 'pointer', fontSize: '14px', width: '100%' }}>Feedback</button></li>
            </ul>
          </nav>
        </div>
      )}

      <FeedbackModal showModal={showFeedbackModal} handleClose={toggleFeedbackModal} />

      <div style={{ paddingTop: '80px', paddingBottom: '60px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
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
              <span style={{ fontSize: '14px', color: '#6c757d' }}>
                Provider: {course.provider}
              </span>

              {/* Display buttons at the bottom */}
              <div style={{ marginTop: 'auto' }}>
                {username === course.provider ? (
                  <Link
                    to={`/courses/${course._id}`}
                    style={{
                      display: 'block',
                      backgroundColor: '#21D375',
                      color: '#fff',
                      padding: '8px 15px',
                      borderRadius: '5px',
                      textAlign: 'center',
                      textDecoration: 'none',
                      cursor: 'pointer',
                      fontSize: '16px',
                    }}
                  >
                    View
                  </Link>
                ) : (
                  <button
                    onClick={() => handleViewClick(course.provider)}
                    style={{
                    
                      color: 'black',
                      border: 'none',
                      padding: '8px 15px',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      fontSize: '16px',
                      width: '100%',
                    }}
                  >
                    Not Authorized
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;

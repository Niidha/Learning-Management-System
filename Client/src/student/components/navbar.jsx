import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useFavorites } from '../favProvider';
import '../../css/navbar.css';
import FeedbackModal from '../../Pages/feedaback';

const Navbar = () => {
  const { username, role } = useSelector((state) => state.user || {});
  const { favoritesList } = useFavorites();
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

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
      <div className="navbar">
        <div className="navbar-left">
          <button onClick={() => setDrawerOpen(!drawerOpen)} className="navbar-btn">
            <FaUser />
          </button>
        </div>
        <div className="navbar-right">
          <span className="username">Hello, {username}</span>
        </div>
      </div>

      {drawerOpen && (
        <div className="drawer">
          <button onClick={() => setDrawerOpen(false)} className="close-btn">
            &times;
          </button>
          <nav>
            <ul>
              {/* Student Navigation */}
              {role === 'student' && (
                <>
                  <li><Link to="/courses" className="drawer-link">Home</Link></li>
                  <li><Link to="/update-profile" className="drawer-link">Update Profile</Link></li>
                  <li><Link to="/favorites" className="drawer-link">Favorites ({favoritesList.length})</Link></li>
                  <li><button className="feedback-btn" onClick={toggleFeedbackModal}>Feedback</button></li>
                  <li><button className="logout-btn" onClick={logout}>Logout</button></li>
                </>
              )}

              {/* Provider Navigation */}
              {role === 'provider' && (
                <>
                  <li><Link to="/provider-dashboard" className="drawer-link">Home</Link></li>
                  <li><Link to="/create-course" className="drawer-link">Create Course</Link></li>
                  <li><Link to="/mycourses" className="drawer-link">My Courses</Link></li>
                  <li><button className="feedback-btn" onClick={toggleFeedbackModal}>Feedback</button></li>
                  <li><button className="logout-btn" onClick={logout}>Logout</button></li>
                </>
              )}

              {/* Admin Navigation */}
              {role === 'admin' && (
                <>
                  <li><Link to="/admin-dashboard" className="drawer-link">Home</Link></li>
                  <li><Link to="/managecourse" className="drawer-link">Course Management</Link></li>
                  <li><Link to="/manageuser" className="drawer-link">User Management</Link></li>
                  <li><Link to="/report" className="drawer-link">View Report</Link></li>
                  <li><Link to="/announcement" className="drawer-link">Announcements</Link></li>
                  <li><button className="logout-btn" onClick={logout}>Logout</button></li>
                </>
              )}
            </ul>
          </nav>
        </div>
      )}

      <FeedbackModal showModal={showFeedbackModal} handleClose={toggleFeedbackModal} />
    </div>
  );
};

export default Navbar;

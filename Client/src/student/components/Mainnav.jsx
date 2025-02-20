import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { useFavorites } from '../favProvider';
import { useDispatch, useSelector } from 'react-redux';
import "../../css/mainnav.css";
import FeedbackModal from '../../Pages/feedaback';

const MainNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const { username, role } = useSelector((state) => state.user || {});
  const { favoritesList } = useFavorites();

  const [searchQuery, setSearchQuery] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleFeedbackModal = () => {
    setShowFeedbackModal(prev => !prev);
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div>
      <div className="navbar">
        <div className='navbar-left'>
          <button onClick={() => setDrawerOpen(!drawerOpen)} className='navbar-btn'>
            <FaUser style={{ marginRight: '8px' }} />
          </button>
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          
        </div>

        <div className="navbar-right">
          <span style={{ fontWeight: 'bold' }}>Hello, {username}</span>
          <button onClick={logout} className="logout-btn">Logout</button>
        </div>
      </div>

      {drawerOpen && (
        <div className="drawer">
          <button onClick={() => setDrawerOpen(false)} className="close-btn">&times;</button>
          <nav>
            <ul>
              {role === 'student' && (
                <>
                  <li><Link to="/courses" className="drawer-link">Home</Link></li>
                  <li><Link to="/update-profile" className="drawer-link">Update Profile</Link></li>
                  <li><Link to="/favorites" className="drawer-link">Favorites ({favoritesList.length})</Link></li>
                  <li><button className="feedback-btn" onClick={toggleFeedbackModal}>Feedback</button></li>
                </>
              )}

              {role === 'provider' && (
                <>
                  <li><Link to="/create-course" className="drawer-link">Create Course</Link></li>
                  <li><Link to="/mycourses" className="drawer-link">My Courses</Link></li>
                  <li><button className="feedback-btn" onClick={toggleFeedbackModal}>Feedback</button></li>
                </>
              )}

              {role === 'admin' && (
                <>
                  <li><Link to="/managecourse" className="drawer-link">Course Management</Link></li>
                  <li><Link to="/manageuser" className="drawer-link">User Management</Link></li>
                  <li><Link to="/report" className="drawer-link">View Reports</Link></li>
                  <li><Link to="/announcement" className="drawer-link">Announcements</Link></li>
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

export default MainNavbar;

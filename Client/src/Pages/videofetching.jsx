import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { api } from '../axios';
import FeedbackModal from './feedaback';
import { FaUser } from 'react-icons/fa';
import { useFavorites } from '../student/favProvider';
import { useSelector } from 'react-redux';

const VideoListPage = () => {
  const { courseId, topic } = useParams();
  const { username } = useSelector((state) => state.user || {});
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);
      const { favoritesList, setFavoritesList } = useFavorites();
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

  

  const viewbuttonStyle = {
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
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const response = await api.post('/fetch', { query: topic });
        setVideos(response.data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, [courseId, topic]);

  const getYouTubeThumbnail = (url) => {
    const videoId = url.split('v=')[1]?.split('&')[0];
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  };

  if (loading) {
    return <p style={loadingStyles}>Loading videos for {topic}...</p>;
  }

  if (!Array.isArray(videos) || videos.length === 0) {
    return <p style={noVideosStyles}>No videos available for {topic}.</p>;
  }
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
    <div style={navBarStyle}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <button
          onClick={() => setDrawerOpen(!drawerOpen)}
          style={{ ...viewbuttonStyle, backgroundColor: 'transparent', color: '#fff', marginRight: '20px' }}
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
                          <Link to="/courses" style={{ color: '#fff', textDecoration: 'none' }}>
                            Home
                          </Link>
                        </li>
            <li style={{ marginBottom: '10px' }}>
              <Link to="/update-profile" style={{ color: '#fff', textDecoration: 'none' }}>
                Update Profile
              </Link>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <Link to="/favorites" style={{ color: '#fff', textDecoration: 'none' }}>
                Favorites ({favoritesList.length})
              </Link>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <div className={`feedback-modal `}>
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
              </div>
            </li>
          </ul>
        </nav>
      </div>
    )}

    <FeedbackModal
     showModal={showFeedbackModal}
     handleClose={toggleFeedbackModal}
    />
    <div style={containerStyles}>
      <h1 style={headingStyles}>Videos for {topic}</h1>
      <ul style={videoListStyles}>
        {videos.map((video, index) => (
          <li key={index} style={videoItemStyles}>
            <img
              src={getYouTubeThumbnail(video.url)}
              alt={video.title}
              style={thumbnailStyles}
            />
            <div style={videoInfoStyles}>
              <h2 style={videoTitleStyles}>{video.title}</h2>
              <a href={video.url} target="_blank" rel="noopener noreferrer" style={videoLinkStyles}>
                Watch Video
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

const containerStyles = {
  padding: '50px',
  backgroundColor: '#f8f9fa',
  minHeight: '100vh',
};

const headingStyles = {
  textAlign: 'center',
  marginBottom: '20px',
  fontSize: '28px',
  color: '#333',
};

const videoListStyles = {
  listStyleType: 'none',
  padding: 0,
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
};

const videoItemStyles = {
  margin: '10px',
  padding: '15px',
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  width: '280px',
};

const thumbnailStyles = {
  width: '100%',
  borderRadius: '4px',
};

const videoInfoStyles = {
  marginTop: '10px',
  textAlign: 'center',
};

const videoTitleStyles = {
  fontSize: '18px',
  color: '#333',
  margin: '10px 0',
};

const videoLinkStyles = {
  color: '#007bff',
  textDecoration: 'none',
  fontSize: '16px',
  transition: 'color 0.3s',
};

const loadingStyles = {
  textAlign: 'center',
  fontSize: '20px',
  color: '#555',
};

const noVideosStyles = {
  textAlign: 'center',
  fontSize: '20px',
  color: '#555',
};

export default VideoListPage;

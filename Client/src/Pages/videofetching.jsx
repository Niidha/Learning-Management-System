import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { api } from '../axios';
import Navbar from '../student/components/navbar';

const VideoListPage = () => {
  const { courseId, topic } = useParams();
  const navigate = useNavigate();

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);


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

  const toggleFeedbackModal = () => {
    setShowFeedbackModal(prev => !prev);
  };

  if (loading) {
    return <p style={loadingStyles}>Loading videos for {topic}...</p>;
  }

  if (!Array.isArray(videos) || videos.length === 0) {
    return <p style={noVideosStyles}>No videos available for {topic}.</p>;
  }

  return (
    <div>
   
      <Navbar/>
      <div style={containerStyles}>
        <h1 style={headingStyles}>Videos for {topic}</h1>
        <ul style={videoListStyles}>
          {videos.map((video, index) => (
            <li key={index} style={videoItemStyles}>
              <img src={getYouTubeThumbnail(video.url)} alt={video.title} style={thumbnailStyles} />
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

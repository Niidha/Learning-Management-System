import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('Data Structure'); // Default search query

  // Fetch videos from the backend
  useEffect(() => {
    // Fetch videos from the API on component mount
    axios.get('http://localhost:7000/api/videos')
      .then(response => {
        setVideos(response.data);
      })
      .catch(error => {
        console.error('Error fetching videos:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Fetch YouTube videos based on search query
  const fetchYouTubeVideos = () => {
    setLoading(true);
    axios.post('http://localhost:7000/api/fetch-videos', { query: searchQuery })
      .then(response => {
        console.log('Videos fetched and saved:', response.data);
        setVideos(response.data);
      })
      .catch(error => {
        console.error('Error fetching YouTube videos:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Handle search form submission
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    fetchYouTubeVideos();
  };

  if (loading) {
    return <p>Loading videos...</p>;
  }

  if (!Array.isArray(videos) || videos.length === 0) {
    return <p>No videos available.</p>;
  }

  return (
    <div>
      <h1>Top CSE Videos</h1>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search for videos"
        />
        <button type="submit">Search</button>
      </form>
      <ul>
        {videos.map(video => (
          <li key={video._id}>
            <h2>{video.title}</h2>
            <p>Views: {video.views}</p>
            <p>Likes: {video.likes}</p>
            <p>Comments: {video.comments}</p>
            <a href={video.url} target="_blank" rel="noopener noreferrer">Watch Video</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VideoList;

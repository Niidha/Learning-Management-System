// controllers/video.controller.js
import ytSearch from 'yt-search';

import { VideoCollection } from '../model/video.model.mjs';

// Function to fetch YouTube videos based on a search query
const fetchYouTubeVideos = async (query, maxResults = 5) => {
  try {
    const result = await ytSearch(query);
    return result.videos.slice(0, maxResults).map(video => ({
      title: video.title,
      url: video.url,
      views: video.views,
      likes: video.likes,
      comments: video.comments,
    }));
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    return [];
  }
};

// Controller to fetch and save YouTube videos to the database
export const fetchVideos = async (req, res) => {
  const { query } = req.body;
  try {
    const videoData = await fetchYouTubeVideos(query);
    const savedVideos = await VideoCollection.insertMany(videoData);
    res.status(201).send(savedVideos);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Controller to get all videos sorted by rankScore
export const getVideos = async (req, res) => {
  try {
    const videos = await VideoCollection.find().sort({ rankScore: -1 });
    res.status(200).send(videos);
  } catch (error) {
    res.status(500).send(error);
  }
};

// models/video.model.js
import {model,Schema} from 'mongoose';

const videoSchema = new Schema({
  title: String,
  url: String,
  views: Number,
  likes: Number,
  comments: Number,
  rankScore: Number,
});

export const VideoCollection = model('Video', videoSchema);



// routes/video.route.js
import { Router } from "express"
import { fetchVideos, getVideos } from "../controller/video.controller.mjs";


const VideoRoute = Router();

VideoRoute.post('/fetch', fetchVideos);
VideoRoute.get('/videos', getVideos);

export default VideoRoute;

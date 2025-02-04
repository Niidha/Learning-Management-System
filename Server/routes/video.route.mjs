
import { Router } from "express"
import { fetchVideos, getVideos } from "../controller/video.controller.mjs";
import { Auth } from "../middleware/auth.mjs";


const VideoRoute = Router();

VideoRoute.post('/fetch', Auth, fetchVideos);
VideoRoute.get('/videos',Auth, getVideos);

export default VideoRoute;

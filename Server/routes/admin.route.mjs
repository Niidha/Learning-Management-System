import {Router} from 'express';


import { Auth } from '../middleware/auth.mjs';
import { createAnnouncement, deleteAnnouncement, deleteUser, getAllAnnouncements, getCourseById, getUserById, getUsers } from '../controller/admin.controller.mjs';



const adminRoute = Router();

adminRoute.get("/students", getUsers);
adminRoute.get("/students/:id", getUserById);
adminRoute.get("/course/:id", getCourseById);
adminRoute.delete("/user/:id", deleteUser);

adminRoute.get("/announcements",  Auth, getAllAnnouncements)
adminRoute.post("/announcements", Auth, createAnnouncement)
adminRoute.delete("/announcements/:id", Auth, deleteAnnouncement);




export default adminRoute

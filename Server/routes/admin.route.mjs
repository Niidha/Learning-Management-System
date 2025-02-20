import { Router } from "express";
import { Auth, authorizeRoles } from "../middleware/auth.mjs";
import { createAnnouncement, deleteAnnouncement, deleteUser, getAllAnnouncements, getCourseById, getUserById, getUsers } from "../controller/admin.controller.mjs";

const adminRoute = Router();

// Admin-only routes
adminRoute.get("/students", Auth, getUsers);
adminRoute.get("/students/:id", Auth, authorizeRoles("admin"), getUserById);
adminRoute.get("/course/:id", Auth, authorizeRoles("admin"), getCourseById);
adminRoute.delete("/user/:id", Auth, authorizeRoles("admin"), deleteUser);

// Announcements (Only Admins can create/delete)
adminRoute.get("/announcements", Auth, authorizeRoles("admin"), getAllAnnouncements);
adminRoute.post("/announcements", Auth, authorizeRoles("admin"), createAnnouncement);
adminRoute.delete("/announcements/:id", Auth, authorizeRoles("admin"), deleteAnnouncement);

export default adminRoute;

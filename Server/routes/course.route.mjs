import { Router } from "express";
import { createCourse, deleteCourse, editCourse, getCourseDetails, getCourses, getCoursesByProvider } from "../controller/course.controller.mjs";
import { Auth, authorizeRoles } from "../middleware/auth.mjs";

const courseRoute = Router();

// Provider can create courses
courseRoute.post("/courses", Auth, authorizeRoles("provider"), createCourse);

// Public access
courseRoute.get("/mycourses", getCourses);
courseRoute.get("/course/:courseId", getCourseDetails);

// Get courses by provider (Provider only)
courseRoute.get("/courses/provider/:username", Auth, authorizeRoles("provider"), getCoursesByProvider);

// Provider can edit courses
courseRoute.patch("/edit-course/:courseId", Auth, authorizeRoles("provider"), editCourse);

// Admin can delete courses
courseRoute.delete("/delete-course/:courseId", Auth, authorizeRoles("admin"), deleteCourse);

export default courseRoute;

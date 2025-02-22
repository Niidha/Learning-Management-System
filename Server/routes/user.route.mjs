import { Router } from "express";
import userController, { getUserDetails, updateUser } from "../controller/user.controller.mjs";
import { Auth, authorizeRoles } from "../middleware/auth.mjs";
import { getCourses } from "../controller/course.controller.mjs";
import { CourseCollection } from "../model/courselist.model.mjs";
import { FeedbackCollection } from "../model/feedback.model.mjs";
import { addFavorite, getFavorites, removeFromFavorite } from "../controller/fav.controller.mjs";

const userRoute = Router();

// Public routes
userRoute.post("/signup", userController.signUp);
userRoute.post("/login", userController.login);

// User routes (Authenticated)
userRoute.patch("/update/:userId", Auth, updateUser);
userRoute.get("/courses", Auth, getCourses);
userRoute.get("/:userId", Auth, getUserDetails);
userRoute.post("/favs", Auth, addFavorite);
userRoute.get("/favourites/:userId", getFavorites);
userRoute.delete("/remove",  removeFromFavorite);

// Fetch course details (Student and Provider only)
userRoute.get("/courses/:id", Auth, authorizeRoles("student", "provider"), async (req, res) => {
  const { id } = req.params;
  try {
    const course = await CourseCollection.findById(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: "Error fetching course details" });
  }
});

// Submit Feedback (All authenticated users)
userRoute.post("/feedback", Auth, async (req, res) => {
  const { name, email, feedback } = req.body;

  try {
    const newFeedback = new FeedbackCollection({ name, email, feedback });
    await newFeedback.save();
    res.status(200).json({ message: "Feedback submitted successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error submitting feedback" });
  }
});

export default userRoute;

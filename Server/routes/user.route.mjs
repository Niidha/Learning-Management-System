import { Router } from "express"
import userController, { getUserDetails, updateUser } from "../controller/user.controller.mjs"
import { Auth } from "../middleware/auth.mjs"
import { getCourses } from "../controller/course.controller.mjs"
import { CourseCollection } from "../model/courselist.model.mjs"
import { FeedbackCollection } from "../model/feedback.model.mjs"




const userRoute=Router()
userRoute.post("/signup",userController.signUp)
userRoute.post("/login",userController.login)
userRoute.patch("/update/:userId",updateUser)
userRoute.get('/courses',getCourses);
userRoute.get('/:userId', getUserDetails);
userRoute.get('/courses/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const course = await CourseCollection.findById(id);
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }
      res.json(course);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching course details' });
    }
  });
  userRoute.post('/feedback', async (req, res) => {
    const { name, email, feedback } = req.body;

    try {
        const newFeedback = new FeedbackCollection({ name, email, feedback });
        await newFeedback.save();
        res.status(200).json({ message: 'Feedback submitted successfully!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error submitting feedback' });
    }
});








// Route to get student details by ID






export default userRoute
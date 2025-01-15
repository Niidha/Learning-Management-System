import {Router} from 'express';
import { createCourse } from '../controller/course.controller.mjs';

import { Auth } from '../middleware/auth.mjs';


const courseRoute = Router();

// Route to create a course
courseRoute.post('/courses',Auth, createCourse);

// Route to get all courses

// Add other routes for updating, deleting, etc., as needed

export default courseRoute

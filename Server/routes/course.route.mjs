import {Router} from 'express';
import { createCourse, deleteCourse, editCourse, getCourseDetails, getCourses, getCoursesByProvider } from '../controller/course.controller.mjs';

import { Auth } from '../middleware/auth.mjs';


const courseRoute = Router();


courseRoute.post('/courses',Auth, createCourse);

courseRoute.get('/mycourses', getCourses);
courseRoute.get('/course/:courseId', getCourseDetails);

courseRoute.get('/courses/provider/:username', getCoursesByProvider);



courseRoute.patch('/edit-course/:courseId',Auth, editCourse);


courseRoute.delete('/delete-course/:courseId', deleteCourse);




export default courseRoute

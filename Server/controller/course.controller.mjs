import {  CourseCollection } from "../model/courselist.model.mjs";


// Controller function to create a new course
export const createCourse = async (req, res) => {
  try {
    const { title, provider, description, syllabus, study_materials, exercises, tests, rating, image } = req.body;

    // Create a new course instance
    const newCourse = new CourseCollection({
      title,
      provider,
      description,
      syllabus,
      study_materials,
      exercises,
      tests,
      rating,
      image
    });

    // Save the course to the database
    const savedCourse = await newCourse.save();

    // Send a success response
    res.status(201).json({
      message: 'Course created successfully',
      course: savedCourse
    });
  } catch (err) {
    // Send error response if something goes wrong
    res.status(500).json({
      message: 'Error creating course',
      error: err.message
    });
  }
};

// Controller function to fetch all courses
export const getCourses = async (req, res) => {
  try {
    const courses = await CourseCollection.find();
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({
      message: 'Error fetching courses',
      error: err.message
    });
  }
};

// Additional controller functions can be added here for updating, deleting, etc.

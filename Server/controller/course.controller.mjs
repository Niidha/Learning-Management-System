import { CourseCollection } from "../model/courselist.model.mjs";


export const createCourse = async (req, res) => {
  try {
    const { title, provider, description, syllabus, study_materials, exercises, tests, rating, image } = req.body;

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

    const savedCourse = await newCourse.save();

    res.status(201).json({
      message: 'Course created successfully',
      course: savedCourse
    });
  } catch (err) {
    res.status(500).json({
      message: 'Error creating course',
      error: err.message
    });
  }
};


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


export const getCoursesByProvider = async (req, res) => {
  try {
    const providerUsername = req.params.username
    const courses = await CourseCollection.find({ provider: providerUsername });
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({
      message: 'Error fetching courses for the provider',
      error: err.message
    });
  }
};

export const editCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    // const { username } = req.body; // Assuming the username is passed in the request body

  
    const course = await CourseCollection.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

   
    const updatedCourse = await CourseCollection.findByIdAndUpdate(
      courseId,
      req.body, 
      { new: true }
    );

    res.status(200).json({
      message: "Course updated successfully",
      course: updatedCourse
    });
  } catch (err) {
    res.status(500).json({
      message: 'Error updating course',
      error: err.message
    });
  }
};


export const deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    // const { username } = req.body; // Assuming the username is passed in the request body

  
    const course = await CourseCollection.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }


   
    await CourseCollection.findByIdAndDelete(courseId);

    res.status(200).json({ message: "Course deleted successfully" });
  } catch (err) {
    res.status(500).json({
      message: 'Error deleting course',
      error: err.message
    });
  }
};

export const getCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.params;

  
    const course = await CourseCollection.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

   
    res.status(200).json({
      message: "Course details fetched successfully",
      course,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Error fetching course details',
      error: err.message
    });
  }
};


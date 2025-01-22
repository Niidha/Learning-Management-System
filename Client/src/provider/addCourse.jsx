// src/pages/AddCourse.jsx
import React from "react";
import { useFormik } from "formik";
import { api } from "../axios"; // Axios instance configured with baseURL
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addCourse } from "../Redux/courseSlice";

const AddCourse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Formik for form handling
  const formik = useFormik({
    initialValues: {
      title: "",
      provider: "",
      description: "",
      syllabus: "",
      study_materials: "",
      exercises: "",
      tests: "",
      rating: 0,
      image: "",
    },
    onSubmit: async (values) => {
      try {
        const { data } = await api.post("/courses", values); // Posting data to backend
        dispatch(addCourse(data.course)); // Dispatching action to Redux store
        toast.success("Course added successfully");
        navigate("/courses"); // Redirecting to the courses page after successful addition
      } catch (err) {
        toast.error(err.response?.data?.message || "An error occurred");
      }
    },
  });

  return (
    <div style={containerStyles}>
      <form onSubmit={formik.handleSubmit} style={formStyles}>
        <h2>Add New Course</h2>
        <input
          type="text"
          name="title"
          placeholder="Course Title"
          value={formik.values.title}
          onChange={formik.handleChange}
          style={inputStyles}
          required
        />
        <input
          type="text"
          name="provider"
          placeholder="Provider"
          value={formik.values.provider}
          onChange={formik.handleChange}
          style={inputStyles}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formik.values.description}
          onChange={formik.handleChange}
          style={textareaStyles}
          required
        />
        <textarea
          name="syllabus"
          placeholder="Syllabus"
          value={formik.values.syllabus}
          onChange={formik.handleChange}
          style={textareaStyles}
          required
        />
        <textarea
          name="study_materials"
          placeholder="Study Materials"
          value={formik.values.study_materials}
          onChange={formik.handleChange}
          style={textareaStyles}
        />
        <textarea
          name="exercises"
          placeholder="Exercises"
          value={formik.values.exercises}
          onChange={formik.handleChange}
          style={textareaStyles}
        />
        <textarea
          name="tests"
          placeholder="Tests"
          value={formik.values.tests}
          onChange={formik.handleChange}
          style={textareaStyles}
        />
        <input
          type="number"
          name="rating"
          placeholder="Rating"
          value={formik.values.rating}
          onChange={formik.handleChange}
          style={inputStyles}
          min="0"
          max="5"
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formik.values.image}
          onChange={formik.handleChange}
          style={inputStyles}
        />
        <button type="submit" className="btn btn-primary" style={buttonStyles}>
          Add Course
        </button>
      </form>
    </div>
  );
};

// Styles
const containerStyles = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundColor: "#f8f9fa",
};

const formStyles = {
  width: "400px",
  padding: "20px",
  borderRadius: "8px",
  backgroundColor: "#fff",
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const inputStyles = {
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ced4da",
  fontSize: "16px",
};

const textareaStyles = {
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ced4da",
  fontSize: "16px",
  minHeight: "100px",
};

const buttonStyles = {
  padding: "10px 20px",
  borderRadius: "5px",
  fontSize: "16px",
};

export default AddCourse;

import React, { useState } from "react";
import { api } from "../axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FaTrash, FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import FeedbackModal from "../Pages/feedaback";

const AddCourse = () => {
  const navigate = useNavigate();
  const { username, id } = useSelector((state) => state.user || {});
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    
      const navBarStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#343a40',
        color: '#fff',
        width: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1000,
      };
    
      const buttonStyle = {
        backgroundColor: '#dc3545',
        color: '#fff',
        border: 'none',
        padding: '8px 15px',
        borderRadius: '5px',
        cursor: 'pointer',
      };
      const logoutbuttonStyle = {
        backgroundColor: '#dc3545',
        color: '#fff',
        border: 'none',
        padding: '8px 15px',
        borderRadius: '5px',
        cursor: 'pointer',
        position: 'absolute', // Position relative to the nearest positioned ancestor
        bottom: '10px',
        left: '10px'
      };

  const [courseData, setCourseData] = useState({
    title: "",
    provider: username,  
    description: "",
    syllabus: [{ topic: "" }],
    study_materials: [""],
    exercises: [""],
    tests: [""],
    rating: 0,
    image: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  const handleArrayChange = (index, value, type) => {
    const updatedArray = [...courseData[type]];
    updatedArray[index] = value;
    setCourseData({ ...courseData, [type]: updatedArray });
  };

  const handleAddField = (type) => {
    if (type === "syllabus") {
      setCourseData({
        ...courseData,
        syllabus: [...courseData.syllabus, { topic: "" }],
      });
    } else {
      setCourseData({
        ...courseData,
        [type]: [...courseData[type], ""],
      });
    }
  };

  const handleRemoveField = (index, type) => {
    const updatedArray = [...courseData[type]];
    updatedArray.splice(index, 1);
    setCourseData({ ...courseData, [type]: updatedArray });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/courses", courseData);
      toast.success("Course added successfully!");
      navigate("/mycourses"); 
    } catch (error) {
      toast.error(error.response?.data?.message || "Error creating course");
    }
  };
  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    navigate('/');
  };
  const toggleFeedbackModal = () => {
    setShowFeedbackModal(prev => !prev);
  };
  return (
    <div>
   
    <div style={navBarStyle}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <button
          onClick={() => setDrawerOpen(!drawerOpen)}
          style={{ ...buttonStyle, backgroundColor: 'transparent', color: '#fff', marginRight: '20px' }}
        >
          <FaUser style={{ marginRight: '8px' }} />
          
        </button>
      </div>

      <div className="d-flex align-items-center">
        <div className="me-3">
          <span style={{ fontWeight: 'bold' }}>Hello, {username}</span>
        </div>
       
      </div>
    </div>

    {/* Drawer */}
    {drawerOpen && (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '250px',
          height: '100%',
          backgroundColor: '#343a40',
          color: '#fff',
          padding: '20px',
          zIndex: '999',
          boxShadow: '2px 0 5px rgba(0, 0, 0, 0.5)',
        }}
      >
        <button
          onClick={() => setDrawerOpen(false)}
          style={{
            backgroundColor: 'transparent',
            color: '#fff',
            border: 'none',
            fontSize: '20px',
            cursor: 'pointer',
            marginBottom: '20px',
          }}
        >
          &times;
        </button>
        <nav>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '10px' }}>
                          <Link to="/provider-dashboard" style={{ color: '#fff', textDecoration: 'none' }}>
                            Home
                          </Link>
                        </li>
            <li style={{ marginBottom: '10px' }}>
              <Link to="/create-course" style={{ color: '#fff', textDecoration: 'none' }}>
                Create Course
              </Link>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <Link to="/mycourses" style={{ color: '#fff', textDecoration: 'none' }}>
                My Courses
              </Link>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <button
                onClick={toggleFeedbackModal}
                style={{
                  backgroundColor: '#21D375',
                  color: '#fff',
                  border: 'none',
                  padding: '8px 15px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  width: '100%',
                }}
              >
                Feedback
              </button>
               <button style={logoutbuttonStyle} onClick={logout}>
          Logout
        </button>
            </li>
          </ul>
        </nav>
      </div>
    )}

    
    <FeedbackModal
      showModal={showFeedbackModal}
      handleClose={toggleFeedbackModal}
    />
    <div style={formContainerStyles}>
      <h2 style={headingStyles}>Create Course</h2>
      <form onSubmit={handleSubmit} style={formStyles}>
        <div style={inputGroupStyles}>
          <input
            type="text"
            name="title"
            placeholder="Course Title"
            value={courseData.title}
            onChange={handleInputChange}
            required
            style={inputStyles}
          />
          <input
            type="text"
            name="provider"
            placeholder="Provider"
            value={courseData.provider}
            onChange={handleInputChange}
            required
            style={inputStyles}
          />
        </div>

        <textarea
          name="description"
          placeholder="Course Description"
          value={courseData.description}
          onChange={handleInputChange}
          required
          style={textareaStyles}
        />

        <h3 style={subHeadingStyles}>Syllabus</h3>
        {courseData.syllabus.map((item, index) => (
          <div key={index} style={arrayFieldStyles}>
            <input
              type="text"
              placeholder="Topic"
              value={item.topic}
              onChange={(e) =>
                handleArrayChange(index, { topic: e.target.value }, "syllabus")
              }
              required
              style={inputStyles}
            />
            <button
              type="button"
              onClick={() => handleRemoveField(index, "syllabus")}
              style={removeButtonStyles}
            >
              <FaTrash />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleAddField("syllabus")}
          style={addButtonStyles}
        >
          Add Syllabus Item
        </button>

        <h3 style={subHeadingStyles}>Study Materials</h3>
        {courseData.study_materials.map((item, index) => (
          <div key={index} style={arrayFieldStyles}>
            <input
              type="text"
              placeholder="Study Material Link"
              value={item}
              onChange={(e) =>
                handleArrayChange(index, e.target.value, "study_materials")
              }
              required
              style={inputStyles}
            />
            <button
              type="button"
              onClick={() => handleRemoveField(index, "study_materials")}
              style={removeButtonStyles}
            >
              <FaTrash />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleAddField("study_materials")}
          style={addButtonStyles}
        >
          Add Study Material
        </button>

        <h3 style={subHeadingStyles}>Exercises</h3>
        {courseData.exercises.map((item, index) => (
          <div key={index} style={arrayFieldStyles}>
            <input
              type="text"
              placeholder="Exercise Link"
              value={item}
              onChange={(e) =>
                handleArrayChange(index, e.target.value, "exercises")
              }
              required
              style={inputStyles}
            />
            <button
              type="button"
              onClick={() => handleRemoveField(index, "exercises")}
              style={removeButtonStyles}
            >
              <FaTrash />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleAddField("exercises")}
          style={addButtonStyles}
        >
          Add Exercise
        </button>

        <h3 style={subHeadingStyles}>Tests</h3>
        {courseData.tests.map((item, index) => (
          <div key={index} style={arrayFieldStyles}>
            <input
              type="text"
              placeholder="Test Link"
              value={item}
              onChange={(e) =>
                handleArrayChange(index, e.target.value, "tests")
              }
              required
              style={inputStyles}
            />
            <button
              type="button"
              onClick={() => handleRemoveField(index, "tests")}
              style={removeButtonStyles}
            >
              <FaTrash />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleAddField("tests")}
          style={addButtonStyles}
        >
          Add Test
        </button>

        <div style={inputGroupStyles}>
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={courseData.image}
            onChange={handleInputChange}
            required
            style={inputStyles}
          />
          <input
            type="number"
            name="rating"
            placeholder="Rating (0-5)"
            value={courseData.rating}
            onChange={handleInputChange}
            required
            min="0"
            max="5"
            style={inputStyles}
          />
        </div>

        <button type="submit" style={buttonStyles}>
          Create Course
        </button>
      </form>
    </div>
    </div>
  );
};

const formContainerStyles = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "20px",
  width: "100%",
  padding: "20px",
  backgroundColor: "#f8f9fa",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  maxWidth: "900px",
  margin: "50px auto",
  marginTop:"50px",
  marginBottom:"10px"

  
};

const headingStyles = {
  position: "sticky",
  top: 0,
  backgroundColor: "#f8f9fa",
  padding: "10px",
  textAlign: "center",
  color: "#343a40",
  fontSize: "24px",
  fontWeight: "bold",
  marginBottom: "20px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
};

const formStyles = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  width: "100%",
  maxHeight: "80vh",
 
  paddingBottom: "20px",
};

const inputStyles = {
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ced4da",
  fontSize: "16px",
  outline: "none",
  width: "100%",
};

const textareaStyles = {
  ...inputStyles,
  minHeight: "100px",
  resize: "none",
};

const buttonStyles = {
  padding: "10px 20px",
  border: "none",
  borderRadius: "5px",
  backgroundColor: "#007bff",
  color: "#fff",
  fontSize: "16px",
  cursor: "pointer",
  width:"50%"
};

const addButtonStyles = {
  padding: "10px 20px",
  border: "1px solid #007bff",
  borderRadius: "5px",
  backgroundColor: "transparent",
  color: "#007bff",
  cursor: "pointer",
};

const removeButtonStyles = {
  background: "none",
  border: "none",
  color: "#dc3545",
  cursor: "pointer",
};

const inputGroupStyles = {
  display: "flex",
  flexDirection: "row",
  gap: "10px",
  width: "100%",
};

const subHeadingStyles = {
  fontSize: "18px",
  fontWeight: "bold",
  color: "#495057",
  marginBottom: "10px",
};

const arrayFieldStyles = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "10px",
};

export default AddCourse;

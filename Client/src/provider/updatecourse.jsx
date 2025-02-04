import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { api } from "../axios";
import { useSelector } from "react-redux";
import "../css/details.css";
import FeedbackModal from "../Pages/feedaback";
import { FaUser } from "react-icons/fa";

const UpdateCourse = () => {
  const { courseId } = useParams();
   const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [drawerOpen,setDrawerOpen]=useState(false)
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    provider: "",
    description: "",
    syllabus: [{ topic: "" }],
    study_materials: [""],
    exercises: [""],
    tests: [""],
    rating: "",
    image: "",
    username: "",
  });
  const { username } = useSelector((state) => state.user || {});
  const [loading, setLoading] = useState(false);
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


  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await api.get(`/course/${courseId}`);
        setFormData(response.data.course);
      } catch (error) {
        toast.error(error.response?.data?.message || error.message || "An error occurred while fetching course details");
      }
    };
    fetchCourseDetails();
  }, [courseId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes("syllabus")) {
      const index = parseInt(name.split("[")[1].split("]")[0]);
      setFormData((prevFormData) => {
        const updatedSyllabus = [...prevFormData.syllabus];
        updatedSyllabus[index] = { ...updatedSyllabus[index], topic: value };
        return { ...prevFormData, syllabus: updatedSyllabus };
      });
    } else if (name.includes("study_materials")) {
      const index = parseInt(name.split("[")[1].split("]")[0]);
      setFormData((prevFormData) => {
        const updatedMaterials = [...prevFormData.study_materials];
        updatedMaterials[index] = value;
        return { ...prevFormData, study_materials: updatedMaterials };
      });
    } else if (name.includes("exercises")) {
      const index = parseInt(name.split("[")[1].split("]")[0]);
      setFormData((prevFormData) => {
        const updatedExercises = [...prevFormData.exercises];
        updatedExercises[index] = value;
        return { ...prevFormData, exercises: updatedExercises };
      });
    } else if (name.includes("tests")) {
      const index = parseInt(name.split("[")[1].split("]")[0]);
      setFormData((prevFormData) => {
        const updatedTests = [...prevFormData.tests];
        updatedTests[index] = value;
        return { ...prevFormData, tests: updatedTests };
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  const addField = (field) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: [...prevFormData[field], field === "syllabus" ? { topic: "" } : ""],
    }));
  };
  const removeField = (field, index) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index), // Removes the selected field
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.patch(`/edit-course/${courseId}`, formData);
      toast.success(response.data.message);
      navigate("/mycourses");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "An error occurred while updating the course");
    }
    setLoading(false);
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
    <div className="container mb-3 " >
      <h2 className="my-5">Update Course</h2>
      <form onSubmit={handleSubmit}>
      <div className="form-group">
  <label htmlFor="username">Username</label>
  <input
    type="text"
    className="form-control"
    id="username"
    name="username"
    value={username}
    onChange={handleChange}
    required
  />
</div>

<div className="form-group">
  <label htmlFor="title">Title</label>
  <input
    type="text"
    className="form-control"
    id="title"
    name="title"
    value={formData.title}
    onChange={handleChange}
    required
  />
</div>

<div className="form-group">
  <label htmlFor="provider">Provider</label>
  <input
    type="text"
    className="form-control"
    id="provider"
    name="provider"
    value={formData.provider}
    onChange={handleChange}
    required
  />
</div>

<div className="form-group">
  <label htmlFor="description">Description</label>
  <textarea
    className="form-control"
    id="description"
    name="description"
    value={formData.description}
    onChange={handleChange}
    required
  ></textarea>
</div>

{/* Syllabus Section */}
<div className="form-group">
  <label htmlFor="syllabus">Syllabus</label>
  <div className="horizontal-fields">
    {formData.syllabus.map((item, index) => (
      <div key={index} className="input-group">
        <input
          type="text"
          className="form-control"
          name={`syllabus[${index}].topic`}
          value={item.topic}
          onChange={handleChange}
          required
        />
        <button
          type="button"
          className="trash-btn"
          onClick={() => removeField("syllabus", index)}
        >
          🗑️
        </button>
      </div>
    ))}
    <button
      type="button"
      className="add-btn"
      onClick={() => addField("syllabus")}
    >
      +
    </button>
  </div>
</div>

{/* Study Materials Section */}
<div className="form-group">
  <label htmlFor="study_materials">Study Materials</label>
  <div className="horizontal-fields">
    {formData.study_materials.map((material, index) => (
      <div key={index} className="input-group">
        <input
          type="text"
          className="form-control"
          name={`study_materials[${index}]`}
          value={material}
          onChange={handleChange}
          required
        />
        <button
          type="button"
          className="trash-btn"
          onClick={() => removeField("study_materials", index)}
        >
          🗑️
        </button>
      </div>
    ))}
    <button
      type="button"
      className="add-btn"
      onClick={() => addField("study_materials")}
    >
      +
    </button>
  </div>
</div>

{/* Exercises Section */}
<div className="form-group">
  <label htmlFor="exercises">Exercises</label>
  <div className="horizontal-fields">
    {formData.exercises.map((exercise, index) => (
      <div key={index} className="input-group">
        <input
          type="text"
          className="form-control"
          name={`exercises[${index}]`}
          value={exercise}
          onChange={handleChange}
          required
        />
        <button
          type="button"
          className="trash-btn"
          onClick={() => removeField("exercises", index)}
        >
          🗑️
        </button>
      </div>
    ))}
    <button
      type="button"
      className="add-btn"
      onClick={() => addField("exercises")}
    >
      +
    </button>
  </div>
</div>

{/* Tests Section */}
<div className="form-group">
  <label htmlFor="tests">Tests</label>
  <div className="horizontal-fields">
    {formData.tests.map((test, index) => (
      <div key={index} className="input-group">
        <input
          type="text"
          className="form-control"
          name={`tests[${index}]`}
          value={test}
          onChange={handleChange}
          required
        />
        <button
          type="button"
          className="trash-btn"
          onClick={() => removeField("tests", index)}
        >
          🗑️
        </button>
      </div>
    ))}
    <button
      type="button"
      className="add-btn"
      onClick={() => addField("tests")}
    >
      +
    </button>
  </div>
</div>

<div className="form-group">
  <label htmlFor="rating">Rating</label>
  <input
    type="number"
    className="form-control"
    id="rating"
    name="rating"
    value={formData.rating}
    onChange={handleChange}
    required
  />
</div>

<div className="form-group">
  <label htmlFor="image">Image URL</label>
  <input
    type="text"
    className="form-control"
    id="image"
    name="image"
    value={formData.image}
    onChange={handleChange}
    required
  />
</div>

        <button type="submit" className="btn btn-primary mt-3" disabled={loading}>
          {loading ? "Updating..." : "Update Course"}
        </button>
      </form>
    </div>
    </div>
  );
};

export default UpdateCourse;

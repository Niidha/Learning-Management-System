// CourseDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { api } from '../axios';
import FeedbackModal from '../Pages/feedaback';
import { FaPen } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import Navbar from './components/navbar';
import './css/coursedetail.css';

const CourseDetail = () => {
  const { id } = useParams();
  const { username, role } = useSelector((state) => state.user || {});
  const [course, setCourse] = useState(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await api.get(`users/courses/${id}`);
        setCourse(response.data);
      } catch (err) {
        console.error('Error fetching course details:', err);
      }
    };
    fetchCourse();
  }, [id]);

  if (!course) return <p>Loading...</p>;

  const toggleFeedbackModal = () => {
    setShowFeedbackModal(prev => !prev);
  };

  const editButtonStyle = { color: 'black', padding: '10px', borderRadius: '5px', cursor: 'pointer' };

  return (
    <div>
      <Navbar />
      <FeedbackModal
        showModal={showFeedbackModal}
        handleClose={toggleFeedbackModal}
      />
      <div className="course-container">
        <div className="course-content">
          {role === 'provider' && (
            <button onClick={() => navigate(`/edit-course/${id}`)} className="edit-btn"><FaPen /></button>
          )}
          <div className="course-image-container">
            <img src={course.image} alt={course.title} className="course-image" />
          </div>
          <h1 className="course-title">{course.title}</h1>
          <p className="course-description">{course.description}</p>
          <div className="section">
  <h2>Syllabus</h2>
  {course.syllabus && Array.isArray(course.syllabus) && course.syllabus.length > 0 ? (
    <table className="table">
      <thead>
        <tr>
          <th className="table-header">#</th>
          <th className="table-header">Topic</th>
        </tr>
      </thead>
      <tbody>
        {course.syllabus.map((item, index) => (
          <tr key={index}>
            <td className="table-cell">{index + 1}</td>
            <td className="table-cell">
              <Link
                to={`/videos/${id}/${encodeURIComponent(item.topic)}`}
                className="link-style"
              >
                {item.topic}
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <p>No syllabus available</p>
  )}
</div>

<div className="section">
  <h2>Study Materials</h2>
  {Array.isArray(course.study_materials) && course.study_materials.length > 0 ? (
    <table className="table">
      <thead>
        <tr>
          <th className="table-header">#</th>
          <th className="table-header">Study Material</th>
        </tr>
      </thead>
      <tbody>
        {course.study_materials.map((material, index) => (
          <tr key={index}>
            <td className="table-cell">{index + 1}</td>
            <td className="table-cell">
              <a href={material} target="_blank" rel="noopener noreferrer" className="link-style">
                Material {index + 1}
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <p>No study materials available</p>
  )}
</div>

<div className="section">
  <h2>Exercises</h2>
  {Array.isArray(course.exercises) && course.exercises.length > 0 ? (
    <table className="table">
      <thead>
        <tr>
          <th className="table-header">#</th>
          <th className="table-header">Exercise</th>
        </tr>
      </thead>
      <tbody>
        {course.exercises.map((exercise, index) => (
          <tr key={index}>
            <td className="table-cell">{index + 1}</td>
            <td className="table-cell">
              <a href={exercise} target="_blank" rel="noopener noreferrer" className="link-style">
                Exercise {index + 1}
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <p>No exercises available</p>
  )}
</div>

<div className="section">
  <h2>Tests</h2>
  {Array.isArray(course.tests) && course.tests.length > 0 ? (
    <table className="table">
      <thead>
        <tr>
          <th className="table-header">#</th>
          <th className="table-header">Test</th>
        </tr>
      </thead>
      <tbody>
        {course.tests.map((test, index) => (
          <tr key={index}>
            <td className="table-cell">{index + 1}</td>
            <td className="table-cell">
              <a href={test} target="_blank" rel="noopener noreferrer" className="link-style">
                Test {index + 1}
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <p>No tests available</p>
  )}
</div>

        </div>
        </div>
      </div>
    
  );
};

export default CourseDetail;

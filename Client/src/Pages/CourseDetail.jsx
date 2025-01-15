import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`http://localhost:7000/api/users/courses/${id}`);
        setCourse(response.data);
      } catch (err) {
        console.error('Error fetching course details:', err);
      }
    };
    fetchCourse();
  }, [id]);

  if (!course) return <p>Loading...</p>;

  return (
    <div style={containerStyles}>
      <div style={contentStyles}>
        <div style={imageContainerStyles}>
          <img
            src={course.image}
            alt={course.title}
            style={imageStyles}
          />
        </div>

        <h1 style={titleStyles}>{course.title}</h1>

        <p style={descriptionStyles}>
          {course.description}
        </p>

        <div style={sectionStyles}>
          <h2>Syllabus</h2>
          {course.syllabus && Array.isArray(course.syllabus) && course.syllabus.length > 0 ? (
            <table style={tableStyles}>
              <thead>
                <tr>
                  <th style={tableHeaderStyles}>#</th>
                  <th style={tableHeaderStyles}>Topic</th>
                </tr>
              </thead>
              <tbody>
                {course.syllabus.map((item, index) => (
                  <tr key={index}>
                    <td style={tableCellStyles}>{index + 1}</td>
                    <td style={tableCellStyles}>
                      <a href={item.video_link} target="_blank" rel="noopener noreferrer" style={linkStyles}>
                        {item.topic}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No syllabus available</p>
          )}
        </div>

        <div style={sectionStyles}>
          <h2>Tests</h2>
          <ul style={listStyles}>
            {Array.isArray(course.tests) && course.tests.length > 0 ? (
              course.tests.map((test, index) => (
                <li key={index}>
                  <a href={test.link} target="_blank" rel="noopener noreferrer" style={linkStyles}>
                    {test.title}
                  </a>
                </li>
              ))
            ) : (
              <p>No tests available</p>
            )}
          </ul>
        </div>

        <div style={sectionStyles}>
          <h2>Exercises</h2>
          <ul style={listStyles}>
            {Array.isArray(course.exercises) && course.exercises.length > 0 ? (
              course.exercises.map((exercise, index) => (
                <li key={index}>
                  <a href={exercise.link} target="_blank" rel="noopener noreferrer" style={linkStyles}>
                    {exercise.title}
                  </a>
                </li>
              ))
            ) : (
              <p>No exercises available</p>
            )}
          </ul>
        </div>

        <div style={sectionStyles}>
          <h2>Study Materials</h2>
          <ul style={listStyles}>
            {Array.isArray(course.study_materials) && course.study_materials.length > 0 ? (
              course.study_materials.map((material, index) => (
                <li key={index}>
                  <a href={material.link} target="_blank" rel="noopener noreferrer" style={linkStyles}>
                    {material.title}
                  </a>
                </li>
              ))
            ) : (
              <p>No study materials available</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

// Styles
const containerStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  minHeight: '100vh',
  backgroundColor: '#f8f9fa',
};

const contentStyles = {
  padding: '30px',
  maxWidth: '1000px',
  margin: '0 15px',
  backgroundColor: '#fff',
  borderRadius: '10px',
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
};

const imageContainerStyles = {
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '20px',
};

const imageStyles = {
  width: '50%',
  maxWidth: '350px',
  height: 'auto',
  objectFit: 'cover',
  borderRadius: '8px',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
};

const titleStyles = {
  textAlign: 'center',
  fontSize: '32px',
  fontWeight: 'bold',
  margin: '10px 0',
  color: '#333',
};

const descriptionStyles = {
  fontSize: '18px',
  marginBottom: '20px',
  lineHeight: '1.6',
  color: '#555',
};

const sectionStyles = {
  marginBottom: '20px',
};

const listStyles = {
  listStyleType: 'none',
  paddingLeft: '0',
};

const linkStyles = {
  color: '#007bff',
  textDecoration: 'none',
  fontSize: '16px',
  transition: 'color 0.3s',
};

linkStyles[':hover'] = {
  color: '#0056b3',
  textDecoration: 'underline',
};

// Table styles
const tableStyles = {
  width: '100%',
  borderCollapse: 'collapse',
  marginTop: '20px',
};

const tableHeaderStyles = {
  backgroundColor: '#f8f9fa',
  padding: '10px',
  border: '1px solid #ddd',
  textAlign: 'left',
};

const tableCellStyles = {
  padding: '10px',
  border: '1px solid #ddd',
  textAlign: 'left',
};

export default CourseDetail;

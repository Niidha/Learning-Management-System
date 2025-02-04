import React, { useState } from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import AboutModal from './aboutModal';

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={homePageContainerStyles}>
      <div style={contentContainerStyles}>
        <div style={descriptionSectionStyles}>
          <h1 style={headingStyles}>Welcome to SmartLearn!</h1>
          <p style={descriptionStyles}>
            SmartLearn is an innovative platform designed to help students
            learn smarter and faster. Explore various online courses, improve
            your skills, and excel in your academic journey.
          </p>
          <button onClick={openModal} style={buttonStyles}>
            <FaInfoCircle size={18} style={{ marginRight: '8px' }} />
            Learn More
          </button>
        </div>

        <div style={imageSectionStyles}>
          <img
            src="https://img.freepik.com/premium-vector/e-learning-makes-it-easy-student-learn_4968-681.jpg?w=1380"
            alt="Learning"
            style={imageStyles}
          />
        </div>
      </div>

     

     
      {isModalOpen && <AboutModal closeModal={closeModal} />}
    </div>
  );
};

// Styles
const homePageContainerStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: 'calc(100vh - 140px)',  // Adjusted for header (60px) and footer (80px) height

  padding: '20px',
};

const contentContainerStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto', // Center the content
};

const descriptionSectionStyles = {
  flex: '1',
  paddingRight: '30px',
};

const headingStyles = {
  fontSize: '36px',
  fontWeight: '700',
  color: '#333',
};

const descriptionStyles = {
  fontSize: '18px',
  lineHeight: '1.6',
  color: '#555',
  margin: '20px 0',
};

const buttonStyles = {
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#3498DB',
  color: '#fff',
  padding: '12px 20px',
  borderRadius: '5px',
  textDecoration: 'none',
  fontSize: '16px',
  transition: 'background-color 0.3s ease',
  border: 'none',
  cursor: 'pointer',
};

const imageSectionStyles = {
  flex: '1',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const imageStyles = {
  width: '100%',
  maxWidth: '500px',
  borderRadius: '8px',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
};



export default HomePage;

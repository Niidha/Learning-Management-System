import React, { useState } from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import AboutModal from './aboutModal';

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.textSection}>
          <h1 style={styles.heading}>Welcome to SmartLearn!</h1>
          <p style={styles.description}>
            SmartLearn is an innovative platform designed to help students
            learn smarter and faster. Explore various online courses, improve
            your skills, and excel in your academic journey.
          </p>
          <button onClick={openModal} style={styles.button}>
            <FaInfoCircle size={18} style={{ marginRight: '8px' }} />
            Learn More
          </button>
        </div>

        <div style={styles.imageSection}>
          <img
            src="https://img.freepik.com/premium-vector/e-learning-makes-it-easy-student-learn_4968-681.jpg?w=1380"
            alt="Learning"
            style={styles.image}
          />
        </div>
      </div>

      {isModalOpen && <AboutModal closeModal={closeModal} />}
    </div>
  );
};

// Responsive Styles
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'calc(100vh - 140px)',
    padding: '20px',
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  textSection: {
    flex: 1,
    paddingRight: '30px',
  },
  heading: {
    fontSize: 'clamp(24px, 4vw, 36px)', // Scales between 24px to 36px based on viewport width
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
  },
  description: {
    fontSize: 'clamp(14px, 2vw, 18px)', // Adjust font size for responsiveness
    lineHeight: '1.6',
    color: '#555',
    margin: '20px 0',
    textAlign: 'center',
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3498DB',
    color: '#fff',
    padding: '12px 20px',
    borderRadius: '5px',
    textDecoration: 'none',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
    border: 'none',
    cursor: 'pointer',
    width: '100%',
    maxWidth: '200px',
    margin: '0 auto',
  },
  imageSection: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    maxWidth: '500px',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },

  // Mobile Styles
  '@media (max-width: 768px)': {
    content: {
      flexDirection: 'column', // Stack items vertically on smaller screens
      textAlign: 'center',
    },
    textSection: {
      paddingRight: '0px',
    },
    image: {
      maxWidth: '80%', // Reduce image size for smaller screens
    },
  },
};

export default HomePage;

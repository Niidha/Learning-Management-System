import React from 'react';

const AboutModal = ({ closeModal }) => {
  return (
    <div style={modalOverlayStyles}>
      <div style={modalContainerStyles}>
       
        <button onClick={closeModal} style={closeButtonStyles}>X</button>
        <h2 style={modalHeadingStyles}>About Us</h2>
        <p style={modalContentStyles}>
          SmartLearn is an innovative platform that aims to provide students with
          the best online learning experience. We offer a variety of courses and
          resources to help you achieve your academic goals. Our mission is to
          empower learners by offering high-quality content, interactive
          learning methods, and personalized support.
        </p>
        <p style={modalContentStyles}>
          With SmartLearn, students can easily access study materials, track their
          progress, and engage with instructors. Whether you're preparing for exams
          or learning new skills, SmartLearn has everything you need to succeed.
        </p>
        
      
        <div style={contactSectionStyles}>
          <h3 style={contactHeadingStyles}>Contact Us</h3>
          <p style={contactInfoStyles}><strong>Email:</strong> contact@smartlearn.com</p>
          <p style={contactInfoStyles}><strong>Phone:</strong> +123 456 789</p>
          <p style={contactInfoStyles}><strong>Address:</strong> 123 Learning St, Knowledge City, ABC Country</p>
        </div>
      </div>
    </div>
  );
};


const modalOverlayStyles = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1001,
};

const modalContainerStyles = {
  backgroundColor: '#fff',
  padding: '30px',
  borderRadius: '8px',
  width: '500px',
  maxWidth: '90%',
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
  textAlign: 'center',
  position: 'relative',
};

const closeButtonStyles = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  backgroundColor: 'transparent',
  border: 'none',
  fontSize: '20px',
  color: '#333',
  cursor: 'pointer',
};

const modalHeadingStyles = {
  fontSize: '24px',
  fontWeight: '700',
  color: '#333',
};

const modalContentStyles = {
  fontSize: '16px',
  color: '#555',
  lineHeight: '1.6',
  margin: '20px 0',
};

const contactSectionStyles = {
  marginTop: '20px',
  textAlign: 'left',
};

const contactHeadingStyles = {
  fontSize: '20px',
  fontWeight: '700',
  color: '#333',
};

const contactInfoStyles = {
  fontSize: '16px',
  color: '#555',
  margin: '8px 0',
};

export default AboutModal;

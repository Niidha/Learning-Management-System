import React, { useState } from 'react';
import axios from 'axios';
import { api } from '../axios';

const FeedbackModal = ({ showModal, handleClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('users/feedback', {
        name,
        email,
        feedback,
      });

      setMessage(response.data.message);
      handleClose();
    } catch (err) {
      console.error(err);
      setMessage('Error submitting feedback');
    }
  };

  if (!showModal) return null;

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.modal}>
        <h3>Feedback</h3>
        {message && <p>{message}</p>}
        <form onSubmit={handleSubmit}>
          <div style={modalStyles.formGroup}>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={modalStyles.input}
            />
          </div>
          <div style={modalStyles.formGroup}>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={modalStyles.input}
            />
          </div>
          <div style={modalStyles.formGroup}>
            <label>Feedback:</label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              required
              style={modalStyles.textarea}
            />
          </div>
          <div style={modalStyles.buttonGroup}>
            <button type="submit" style={modalStyles.submitButton}>Submit</button>
            <button type="button" onClick={handleClose} style={modalStyles.closeButton}>Close</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const modalStyles = {
  overlay: {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1050, // Ensure it's above other elements like drawer
  }
  ,
  modal: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    width: '400px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    
  },
  formGroup: {
    marginBottom: '15px',
    
  },
  input: {
    width: '100%',
    padding: '10px',
    marginTop: '5px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    marginTop: '5px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    minHeight: '100px',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  submitButton: {
    backgroundColor: '#21D375',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    width:'30%'
  },
  closeButton: {
    backgroundColor: '#dc3545',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
  },
};

export default FeedbackModal;

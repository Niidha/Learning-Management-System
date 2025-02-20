import React, { useState } from 'react';
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
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h3 style={styles.title}>Feedback</h3>
        {message && <p style={styles.message}>{message}</p>}
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Feedback:</label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              required
              style={styles.textarea}
            />
          </div>
          <div style={styles.buttonGroup}>
            <button type="submit" style={styles.submitButton}>Submit</button>
            <button type="button" onClick={handleClose} style={styles.closeButton}>Close</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Responsive Styles
const styles = {
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
    zIndex: 1050,
    padding: '10px', // Ensures space on small screens
  },
  modal: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    width: '90%',
    maxWidth: '450px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  title: {
    fontSize: '1.5rem',
    marginBottom: '10px',
  },
  message: {
    color: 'green',
    fontSize: '14px',
    marginBottom: '10px',
  },
  formGroup: {
    marginBottom: '15px',
    textAlign: 'left',
  },
  label: {
    fontSize: '14px',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginTop: '5px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '14px',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    marginTop: '5px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    minHeight: '100px',
    fontSize: '14px',
  },
  buttonGroup: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: '10px',
    marginTop: '10px',
  },
  submitButton: {
    backgroundColor: '#21D375',
    color: '#fff',
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    flex: '1',
    minWidth: '120px',
  },
  closeButton: {
    backgroundColor: '#dc3545',
    color: '#fff',
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    flex: '1',
    minWidth: '120px',
  },
};

export default FeedbackModal;

import React, { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useFavorites } from './favProvider';
import { Link } from 'react-router-dom';
import { api } from '../axios';
import FeedbackModal from '../Pages/feedaback';
import Navbar from './components/navbar'; 

const FavoritesPage = () => {
  const { favoritesList, setFavoritesList } = useFavorites();
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favoritesList');
    if (storedFavorites) {
      setFavoritesList(JSON.parse(storedFavorites));
    }
  }, [setFavoritesList]);

  useEffect(() => {
    localStorage.setItem('favoritesList', JSON.stringify(favoritesList));
  }, [favoritesList]);

  const handleRemoveFromFavorites = async (removeId, userId) => {
    try {
      const response = await api.delete('users/remove', {
        course_id: removeId,
        user_id: userId,
      });

      if (response.status === 200) {
        const updatedFavorites = favoritesList.filter(course => course._id !== removeId);
        setFavoritesList(updatedFavorites);
        toast.success(`Course has been removed from favorites`);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred while removing the course from favorites");
    }
  };

  return (
    <React.Fragment>
      <Navbar />
      <h3 style={styles.heading}>Favorites List</h3>
      <div style={styles.container}>
        {favoritesList.length > 0 ? (
          favoritesList.map(course => (
            <div key={course._id} style={styles.card}>
              <img src={course.image} alt={course.title} style={styles.image} />
              <div style={styles.content}>
                <h6 style={styles.title}>{course.title}</h6>
                <div style={styles.buttons}>
                  <button
                    onClick={() => handleRemoveFromFavorites(course._id, course.title)}
                    style={styles.removeButton}
                  >
                    <FaTrash /> Remove
                  </button>
                  <Link to={`/courses/${course._id}`} style={styles.viewButton}>
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p style={styles.noFavorites}>No favorite courses added yet.</p>
        )}
      </div>

      <FeedbackModal showModal={showFeedbackModal} handleClose={() => setShowFeedbackModal(false)} />
    </React.Fragment>
  );
};

// Styles for responsiveness
const styles = {
  heading: {
    textAlign: 'center',
    margin: '20px 0',
    paddingTop: '50px',
    fontSize: '1.8rem',
    color: '#333',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    padding: '20px',
    justifyContent: 'center',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '600px',
    textAlign: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    maxWidth: '400px',
    height: 'auto',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
    width: '100%',
    padding: '10px 0',
  },
  title: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginTop: '10px',
    marginBottom: '10px',
    textAlign: 'center',
    color: '#333',
    lineHeight: '1.5',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginTop: '15px',
  },
  removeButton: {
    padding: '8px 15px',
    fontSize: '14px',
    cursor: 'pointer',
    borderRadius: '5px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },
  viewButton: {
    padding: '8px 15px',
    fontSize: '14px',
    cursor: 'pointer',
    borderRadius: '5px',
    backgroundColor: '#21D375',
    color: 'white',
    textDecoration: 'none',
    textAlign: 'center',
  },
  noFavorites: {
    textAlign: 'center',
    color: '#777',
    fontSize: '1.2rem',
  },
};

export default FavoritesPage;

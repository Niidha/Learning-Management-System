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
      <Navbar /> {/* Add the Navbar component here */}
      <h3 style={{ textAlign: 'center', margin: '20px 0', paddingTop: '50px' }}>
        Favorites List
      </h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', padding: '20px', justifyContent: 'center' }}>
        {favoritesList.length > 0 ? (
          favoritesList.map(course => (
            <div key={course._id} style={{
              display: 'flex', flexDirection: 'row', alignItems: 'center',
              border: '1px solid #ddd', borderRadius: '8px', padding: '20px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)', width: '600px', textAlign: 'center',
            }}>
              <img src={course.image} alt={course.title} style={{
                width: '200px', height: '200px', objectFit: 'cover',
                borderRadius: '8px', marginRight: '20px'
              }} />
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', flex: 1 }}>
                <h6 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginTop: '10px', marginBottom: '10px', textAlign: 'left', color: '#333', lineHeight: '1.5' }}>
                  {course.title}
                </h6>
                <div style={{ display: 'flex', justifyContent: 'flex-start', gap: '10px', marginTop: '15px' }}>
                  <button
                    onClick={() => handleRemoveFromFavorites(course._id, course.title)}
                    style={{ padding: '8px 15px', fontSize: '14px', cursor: 'pointer', borderRadius: '5px', backgroundColor: '#f44336', color: 'white', border: 'none' }}
                  >
                    <FaTrash /> Remove
                  </button>
                  <Link to={`/courses/${course._id}`} style={{ padding: '8px 15px', fontSize: '14px', cursor: 'pointer', borderRadius: '5px', backgroundColor: '#21D375', color: 'white', textDecoration: 'none' }}>
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', color: '#777' }}>No favorite courses added yet.</p>
        )}
      </div>

      <FeedbackModal showModal={showFeedbackModal} handleClose={() => setShowFeedbackModal(false)} />
    </React.Fragment>
  );
};

export default FavoritesPage;

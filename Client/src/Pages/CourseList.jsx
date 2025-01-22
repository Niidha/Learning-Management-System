import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaHeart, FaShoppingCart, FaUser } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'; 
import FeedbackModal from './feedaback';
import { api } from '../axios';
import { useFavorites } from './favProvider';
import { addToFavorites } from '../Redux/favSlice';
import toast from 'react-hot-toast';

const CourseList = () => {
  const dispatch = useDispatch()
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const { favoritesList, setFavoritesList } = useFavorites();

  const navigate = useNavigate();
  const favorites = useSelector((state) => state.favorites.items || []);
  const { username, id } = useSelector((state) => state.user || {});

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get('users/courses');
        setCourses(response.data);
      } catch (err) {
        console.error('Error fetching courses:', err);
      }
    };
    fetchCourses();
  }, []);

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleAddToFavorites = async (course) => {
    if (!favoritesList.some((item) => item._id === course._id)) {
      const updatedFavorites = [course, ...favoritesList];
      setFavoritesList(updatedFavorites);

      // Log the request body to ensure correct data is being sent
      const payload = { course_id: course.id, user_id: id };
      console.log("Request payload:", payload);

      await api
        .post('/users/favs', payload)
        .then(() => {
          dispatch(addToFavorites(course));
          toast.success(`${course.title} added to favorites!`);
        })
        .catch((err) => {
          console.error('Error adding to favorites:', err);
          toast.error('Failed to add to favorites.');
        });
    } else {
      toast.error('Course already in favorites!');
    }
  };

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px 20px',
          backgroundColor: '#343a40',
          color: '#fff',
          width: '100%',
          position: 'fixed',
          top: '0',
          left: '0',
          zIndex: '1000',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button
            onClick={() => setDrawerOpen(!drawerOpen)}
            style={{
              backgroundColor: 'transparent',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              marginRight: '20px',
              fontSize: '16px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <FaUser style={{ marginRight: '8px' }} />
            View Profile
          </button>
          <div style={{ position: 'relative', flexGrow: 1 }}>
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                maxWidth: '700px',
                padding: '8px 40px 8px 10px',
                borderRadius: '5px',
                border: '1px solid #ced4da',
              }}
            />
            <FiSearch
              style={{
                position: 'absolute',
                top: '50%',
                left: '90%',
                transform: 'translateY(-50%)',
                color: '#6c757d',
              }}
            />
          </div>
        </div>

        <div className="d-flex align-items-center">
          <div className="me-3">
            <span style={{ fontWeight: 'bold' }}>Hello, {username}</span>
          </div>
          <Link
            to="/favorites"
            style={{
              display: "flex",
              alignItems: "center",
              padding: "8px 15px",
              backgroundColor: "#21D375",
              color: "#fff",
              borderRadius: "5px",
              textDecoration: "none",
              fontWeight: "bold",
              marginRight: "10px",
            }}
          >
            <FaHeart style={{ marginRight: "5px" }} /> Cart ({favoritesList.length})
          </Link>
          <button
            style={{
              backgroundColor: '#dc3545',
              color: '#fff',
              border: 'none',
              padding: '8px 15px',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>

      {drawerOpen && (
        <div
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
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
            <ul style={{ listStyle: 'none', padding: '0' }}>
              <li style={{ marginBottom: '10px' }}>
                <Link to="/view-profile" style={{ color: '#fff', textDecoration: 'none' }}>
                  View Profile
                </Link>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <Link to="/update-profile" style={{ color: '#fff', textDecoration: 'none' }}>
                  Update Profile
                </Link>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <button
                  onClick={() => setShowFeedbackModal(true)}
                  style={{
                    backgroundColor: '#21D375',
                    color: '#fff',
                    border: 'none',
                    padding: '8px 15px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    width: '100%',
                    textAlign: 'center',
                  }}
                >
                  Feedback
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}

      <FeedbackModal
        showModal={showFeedbackModal}
        handleClose={() => setShowFeedbackModal(false)}
      />

      <div style={{ paddingTop: '80px', paddingBottom: '60px' }}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          {filteredCourses.map((course) => (
            <div
              key={course._id}
              style={{
                width: '250px',
                height: '350px',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                marginBottom: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <img
                src={course.image}
                alt={course.title}
                style={{
                  width: '100%',
                  height: '150px',
                  objectFit: 'cover',
                  borderRadius: '5px',
                }}
              />
              <h3
                style={{
                  fontSize: '16px',
                  marginTop: '10px',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                }}
              >
                {course.title}
              </h3>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Link
                  to={`/courses/${course._id}`}
                  style={{
                    display: 'block',
                    marginTop: '10px',
                    padding: '8px 15px',
                    backgroundColor: '#21D375',
                    color: '#fff',
                    textDecoration: 'none',
                    textAlign: 'center',
                    borderRadius: '5px',
                    fontSize: '14px',
                  }}
                >
                  View Details
                </Link>

                <button
                  onClick={() => handleAddToFavorites(course)}
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: favoritesList.some((item) => item._id === course._id)
                      ? '#e74c3c'
                      : '#ccc',
                  }}
                >
                  {favoritesList.some((item) => item._id === course._id) ? (
                    <AiFillHeart size={24} />
                  ) : (
                    <AiOutlineHeart size={24} />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseList;

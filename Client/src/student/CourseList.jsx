// CourseList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from './favProvider';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites } from '../Redux/favSlice';
import toast from 'react-hot-toast';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { api } from '../axios';
import MainNavbar from './components/Mainnav';

const CourseList = () => {
  const dispatch = useDispatch();
  const { username, id } = useSelector((state) => state.user || {});
  const { favoritesList, setFavoritesList } = useFavorites();
  
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favoritesList')) || [];
    setFavoritesList(storedFavorites);
  }, [setFavoritesList]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get('users/courses');
        setCourses(response.data);
      } catch (err) {
        console.error('Error fetching courses:', err);
        toast.error('Failed to load courses.');
      }
    };
    fetchCourses();
  }, []);

  const handleAddToFavorites = async (course) => {
    if (!favoritesList.some((item) => item._id === course._id)) {
      const updatedFavorites = [course, ...favoritesList];
      setFavoritesList(updatedFavorites);
      localStorage.setItem('favoritesList', JSON.stringify(updatedFavorites));

      const payload = { course_Id: course._id, user_Id: id };
      try {
        const { data, status } = await api.post('/users/favs', payload);
        if (status === 201) {
          dispatch(addToFavorites(course));
          return toast.success(`${course.title} added to favorites!`);
        }
        return toast.error(data.message);
      } catch (err) {
        console.error('Error adding to favorites:', err);
        toast.error('Failed to add to favorites.');
      }
    } else {
      toast.error('Course already in favorites!');
    }
  };


  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <MainNavbar />
      
      <div style={{ paddingTop: '40px', paddingBottom: '60px' }}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            justifyContent: 'center',
            padding: '20px',
            paddingTop:"5%"
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

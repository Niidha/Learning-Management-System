import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites, setFavorites } from "../Redux/favSlice";
import toast from "react-hot-toast";
import { AiFillHeart } from "react-icons/ai";
import { api } from "../axios";

import FeedbackModal from "../Pages/feedaback";
import { FaUser } from "react-icons/fa";

const CourseList = () => {
  const dispatch = useDispatch();
  const { id: userId,role,username } = useSelector((state) => state.user || {});
  const favoritesList = useSelector((state) => state.favorites.items);
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
 
  const navigate = useNavigate();
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleFeedbackModal = () => {
    setShowFeedbackModal(prev => !prev);
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    navigate('/');
  };


  useEffect(() => {
    if (userId) {
      fetchFavorites();
    }
    fetchCourses();
  }, [userId]);

  const fetchFavorites = async () => {
    if (!userId) return;

    try {
      const { data } = await api.get(`/users/favourites/${userId}`);
      dispatch(setFavorites(data.favorites || []));
    } catch (err) {
      console.error("Error fetching favorites:", err.response?.data || err);
      toast.error("Failed to fetch favorites.");
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await api.get("/users/courses");
      setCourses(response.data);
    } catch (err) {
      console.error("Error fetching courses:", err.response?.data || err);
      toast.error("Failed to load courses.");
    }
  };

  const handleAddToFavorite = async (course) => {
    if (!userId) {
      toast.error("User ID is missing. Please log in.");
      return;
    }
  
    // Optimistically add to favorites
    const isAlreadyFavorite = favoritesList.some((item) => item.course_Id?._id === course._id);
    if (isAlreadyFavorite) {
      toast.error(`${course.title} is already in favorites!`);
      return;
    }
  
    const newFavoritesList = [...favoritesList, { course_Id: { _id: course._id }, ...course }];
    dispatch(setFavorites(newFavoritesList)); 
  
    try {
      const { data, status } = await api.post("/users/favs", {
        course_Id: course._id,
        user_Id: userId,
      });
  
      if (status === 201) {
        toast.success(`${course.title} added to favorites!`);
      } else {
        toast.error(data.message);
        dispatch(setFavorites(favoritesList)); 
      }
    } catch (err) {
      console.error("Error adding to favorites:", err.response?.data || err);
      toast.error("Failed to add to favorites.");
      dispatch(setFavorites(favoritesList)); 
    }
  };
  
  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="navbar">
        <div className='navbar-left'>
          <button onClick={() => setDrawerOpen(!drawerOpen)} className='navbar-btn'>
            <FaUser style={{ marginRight: '8px' }} />
          </button>
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          
        </div>

        <div className="navbar-right">
          <span style={{ fontWeight: 'bold' }}>Hello, {username}</span>
          <button onClick={logout} className="logout-btn">Logout</button>
        </div>
      </div>

      {drawerOpen && (
        <div className="drawer">
          <button onClick={() => setDrawerOpen(false)} className="close-btn">&times;</button>
          <nav>
            <ul>
              {role === 'student' && (
                <>
                  <li><Link to="/courses" className="drawer-link">Home</Link></li>
                  <li><Link to="/update-profile" className="drawer-link">Update Profile</Link></li>
                  <li><Link to="/favorites" className="drawer-link">Favorites ({favoritesList.length})</Link></li>
                  <li><button className="feedback-btn" onClick={toggleFeedbackModal}>Feedback</button></li>
                </>
              )}

              {role === 'provider' && (
                <>
                  <li><Link to="/create-course" className="drawer-link">Create Course</Link></li>
                  <li><Link to="/mycourses" className="drawer-link">My Courses</Link></li>
                  <li><button className="feedback-btn" onClick={toggleFeedbackModal}>Feedback</button></li>
                </>
              )}

              {role === 'admin' && (
                <>
                  <li><Link to="/managecourse" className="drawer-link">Course Management</Link></li>
                  <li><Link to="/manageuser" className="drawer-link">User Management</Link></li>
                  <li><Link to="/report" className="drawer-link">View Reports</Link></li>
                  <li><Link to="/announcement" className="drawer-link">Announcements</Link></li>
                </>
              )}
            </ul>
          </nav>
        </div>
      )}

      <FeedbackModal showModal={showFeedbackModal} handleClose={toggleFeedbackModal} />
  
      <div style={{ paddingTop: "40px", paddingBottom: "60px" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent: "center",
            padding: "20px",
            paddingTop: "5%",
          }}
        >
          {filteredCourses.map((course) => (
            <div
              key={course._id}
              style={{
                width: "250px",
                height: "350px",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <img
                src={course.image}
                alt={course.title}
                style={{
                  width: "100%",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "5px",
                }}
              />
              <h3
                style={{
                  fontSize: "16px",
                  marginTop: "10px",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                }}
              >
                {course.title}
              </h3>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Link
                  to={`/courses/${course._id}`}
                  style={{
                    display: "block",
                    marginTop: "10px",
                    padding: "8px 15px",
                    backgroundColor: "#21D375",
                    color: "#fff",
                    textDecoration: "none",
                    textAlign: "center",
                    borderRadius: "5px",
                    fontSize: "14px",
                  }}
                >
                  View Details
                </Link>
                <button
                  onClick={() => handleAddToFavorite(course)}
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    cursor: "pointer",
                    color: favoritesList.some((item) => item.course_Id?._id === course._id)
                      ? "#e74c3c"
                      : "#ccc",
                  }}
                >
                  <AiFillHeart size={24} />
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

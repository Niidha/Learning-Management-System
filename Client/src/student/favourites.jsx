import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import { useFavorites } from "./favProvider";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { api } from "../axios";
import FeedbackModal from "../Pages/feedaback";
import Navbar from "./components/navbar";

const FavoritesPage = () => {
  const { favoritesList, setFavoritesList } = useFavorites();
  const { id: userId } = useSelector((state) => state.user || {});
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  useEffect(() => {
    if (!userId) return;

    const fetchFavorites = async () => {
      try {
        const { data } = await api.get(`/users/favourites/${userId}`);
        const formattedFavorites = data.favorites.map((fav) => fav.course_Id); 
        setFavoritesList(formattedFavorites || []);
        localStorage.setItem("favoritesList", JSON.stringify(formattedFavorites || []));
      } catch (err) {
        console.error("Error fetching favorites:", err.response?.data || err);
        toast.error("Failed to fetch favorites.");
      }
    };

    fetchFavorites();
  }, [userId, setFavoritesList]);
  const handleRemoveFromFavorites = async (courseId) => {
    if (!userId) {
      toast.error("User ID is missing. Please log in.");
      return;
    }
  
    
    const updatedFavorites = favoritesList.filter((course) => course._id !== courseId);
    setFavoritesList(updatedFavorites);
    localStorage.setItem("favoritesList", JSON.stringify(updatedFavorites));
  
    try {
      const response = await api.delete(`/users/remove`, {
        data: { course_Id: courseId, user_Id: userId },
      });
  
      if (response.status === 200) {
        toast.success("Course removed from favorites.");
      }
    } catch (error) {
      console.error("Error removing favorite:", error.response?.data || error);
      toast.error("Failed to remove course from favorites.");
  
      setFavoritesList([...favoritesList]);
      localStorage.setItem("favoritesList", JSON.stringify(favoritesList));
    }
  };
  

  return (
    <React.Fragment>
      <Navbar />
      <h3 style={styles.heading}>Favorites List</h3>
      <div style={styles.container}>
        {favoritesList.length > 0 ? (
          favoritesList.map((course) => (
            <div key={course._id} style={styles.card}>
              <img src={course.image || "default-image.jpg"} alt={course.title} style={styles.image} />
              <div style={styles.content}>
                <h6 style={styles.title}>{course.title || "Untitled Course"}</h6>
                <div style={styles.buttons}>
                  <button
                    onClick={() => handleRemoveFromFavorites(course._id)}
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


const styles = {
  heading: {
    textAlign: "center",
    margin: "20px 0",
    paddingTop: "50px",
    fontSize: "1.8rem",
    color: "#333",
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    padding: "20px",
    justifyContent: "center",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "600px",
    textAlign: "center",
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    maxWidth: "400px",
    height: "auto",
    objectFit: "cover",
    borderRadius: "8px",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    flex: 1,
    width: "100%",
    padding: "10px 0",
  },
  title: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    marginTop: "10px",
    marginBottom: "10px",
    textAlign: "center",
    color: "#333",
    lineHeight: "1.5",
  },
  buttons: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginTop: "15px",
  },
  removeButton: {
    padding: "8px 15px",
    fontSize: "14px",
    cursor: "pointer",
    borderRadius: "5px",
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
  viewButton: {
    padding: "8px 15px",
    fontSize: "14px",
    cursor: "pointer",
    borderRadius: "5px",
    backgroundColor: "#21D375",
    color: "white",
    textDecoration: "none",
    textAlign: "center",
  },
  noFavorites: {
    textAlign: "center",
    color: "#777",
    fontSize: "1.2rem",
  },
};

export default FavoritesPage;

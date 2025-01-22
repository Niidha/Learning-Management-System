import React, { Fragment } from 'react';
import { FaTrash } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useFavorites } from './favProvider';
import "../css/fav.css"; // Import the updated CSS

const FavoritesPage = () => {
    const { favoritesList, setFavoritesList } = useFavorites();

    const handleRemoveFromFavorites = (removeId, title) => {
        // Filter the favoritesList to remove the selected course
        const res = favoritesList.filter(course => course._id !== removeId);
        setFavoritesList(res);
        // Include the course title in the toast notification
        toast.success(`"${title}" has been removed from favorites`);
    };

    return (
        <Fragment>
            <h3 className="favorites-title">Favorites List</h3>
            <div className="favorites-container">
                {favoritesList.map(course => (
                    <div key={course._id} className="favorites-card">
                        <img
                            src={course.image}
                            alt={course.title}
                            className="favorites-image"
                        />
                        <h6 className="favorites-title">{course.title}</h6>
                        <button
                            onClick={() => handleRemoveFromFavorites(course._id, course.title)} // Pass `title` here
                            className="remove-button"
                        >
                            <FaTrash /> Remove
                        </button>
                    </div>
                ))}
            </div>
        </Fragment>
    );
};

export default FavoritesPage;

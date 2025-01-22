import { favoriteCollection } from "../model/favourites.model.mjs";

// Add a course to favorites
export const addFavorite = async (req, res) => {
  const { course_id, user_id } = req.body;

  console.log("Request received for adding favorite:", req.body);

  if (!course_id || !user_id) {
    return res.status(400).json({ message: "course_id and user_id are required." });
  }

  try {
    // Check if the course is already in favorites
    const existingFavorite = await favoriteCollection.findOne({ course_id, user_id });
    if (existingFavorite) {
      return res.status(400).json({ message: "Course is already in favorites." });
    }

    // Add to favorites
    const favorite = new favoriteCollection({ course_id, user_id });
    await favorite.save();

    res.status(201).json({
      message: "Course added to favorites.",
      favorite,
    });
  } catch (error) {
    console.error("Error in addFavorite:", error);
    res.status(500).json({ message: "Error adding course to favorites.", error });
  }
};

// Get all favorite courses for a user
export const getFavorites = async (req, res) => {
  const { user_id } = req.params;

  console.log("Request received for fetching favorites for user:", user_id);

  if (!user_id) {
    return res.status(400).json({ message: "user_id is required." });
  }

  try {
    // Fetch favorites for the user
    const favorites = await favoriteCollection.find({ user_id }).populate("course_id");

    res.status(200).json({
      message: "Favorites fetched successfully.",
      favorites,
    });
  } catch (error) {
    console.error("Error in getFavorites:", error);
    res.status(500).json({ message: "Error fetching favorites.", error });
  }
};

// Remove a course from favorites
export const removeFavorite = async (req, res) => {
  const { course_id, user_id } = req.body;

  console.log("Request received for removing favorite:", req.body);

  if (!course_id || !user_id) {
    return res.status(400).json({ message: "course_id and user_id are required." });
  }

  try {
    // Remove the course from favorites
    const deletedFavorite = await favoriteCollection.findOneAndDelete({ course_id, user_id });

    if (!deletedFavorite) {
      return res.status(404).json({ message: "Favorite not found." });
    }

    res.status(200).json({
      message: "Course removed from favorites.",
      deletedFavorite,
    });
  } catch (error) {
    console.error("Error in removeFavorite:", error);
    res.status(500).json({ message: "Error removing course from favorites.", error });
  }
};

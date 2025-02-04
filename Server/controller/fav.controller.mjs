import { favoriteCollection } from "../model/favourites.model.mjs";


export const addFavorite = async (req, res) => {
  const { course_Id, user_Id } = req.body;

  console.log("Request received for adding favorite:", req.body);

  if (!course_Id || !user_Id) {
    return res.status(400).json({ message: "course_id and user_id are required." });
  }

  try {
  
    const existingFavorite = await favoriteCollection.findOne({ course_Id, user_Id });
    if (existingFavorite) {
      return res.status(400).json({ message: "Course is already in favorites." });
    }

  
    const favorite = new favoriteCollection({ course_Id, user_Id });
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


export const getFavorites = async (req, res) => {
  const { user_id } = req.params;

  console.log("Request received for fetching favorites for user:", user_id);

  if (!user_id) {
    return res.status(400).json({ message: "user_id is required." });
  }

  try {
  
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

export const removeFromFavorite = async (req, res) => {
  try {
      const { course_id,user_id } = req.body;
   ;

      const favoriteItem = await favoriteCollection.findOneAndDelete({course_id,user_id  });
      if (!favoriteItem) {
          return res.status(404).send({ message: "Course not found in favorite" });
      }

      return res.status(200).send({ message: "Course removed from favorite" });
  } catch (err) {
      return res.status(500).send({ message: err.message || "Internal server error" });
  }
};

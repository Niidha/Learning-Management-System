import mongoose from 'mongoose';

const FavoriteSchema = new mongoose.Schema(
  {
    user_Id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'students', // Assuming you have a User model with a 'users' collection.
    },
    course_Id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'courses', // Assuming you have a Course model with a 'courses' collection.
    },
  },
  {
    timestamps: true,
  }
);

export const favoriteCollection = mongoose.model('favorites', FavoriteSchema);

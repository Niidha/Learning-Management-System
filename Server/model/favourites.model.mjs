import mongoose from 'mongoose';

const FavoriteSchema = new mongoose.Schema(
  {
    user_Id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'students', 
    },
    course_Id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'courses',
    },
  },
  {
    timestamps: true,
  }
);

export const favoriteCollection = mongoose.model('favorites', FavoriteSchema);

import { model, Schema } from 'mongoose';

const studentSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    age: {
      type: Number,
      required: false,
    },
    qualification: {
      type: String,
      required: false,
    },
    preferredLanguage: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      enum: ['admin', 'provider', 'student'], 
      default: 'student',
      required: true,
    },
  },
  { timestamps: true }
);

export const studentCollection = model('users', studentSchema);

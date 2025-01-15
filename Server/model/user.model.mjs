import { model, Schema } from 'mongoose';

const studentSchema = new Schema(
  {
    // Basic login details
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
    
    // Additional student details (can be filled later)
    // fullName: {
    //   type: String,
    //   required: false,
    // },
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
  },
  { timestamps: true }
);

export const studentCollection = model('students', studentSchema);

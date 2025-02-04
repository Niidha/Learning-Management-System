import { model, Schema } from 'mongoose';

const courseSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"]
  },
  provider: {
    type: String,
    required: [true, "Provider is required"]
  },
  description: {
    type: String,
    required: [true, "Description is required"]
  },
  syllabus: [
    {
      topic: {
        type: String,
        required: [true, "Topic is required"]
      }
    }
  ],
  study_materials: {
    type: [String],
    required: [true, "Study materials are required"],
    validate: {
      validator: function (v) {
        return v.length > 0;
      },
      message: "At least one study material link is required"
    }
  },
  exercises: {
    type: [String],
    required: [true, "Exercises are required"],
    validate: {
      validator: function (v) {
        return v.length > 0;
      },
      message: "At least one exercise link is required"
    }
  },
  tests: {
    type: [String],
    required: [true, "Tests are required"],
    validate: {
      validator: function (v) {
        return v.length > 0;
      },
      message: "At least one test link is required"
    }
  },
  rating: {
    type: Number,
    required: [true, "Rating is required"]
  },
  image: {
    type: String,
    required: [true, "Image is required"]
  }
}, { timestamps: true });


export const CourseCollection = model('courses', courseSchema);

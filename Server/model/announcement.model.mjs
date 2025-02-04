import { model, Schema } from 'mongoose';

const announcementSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"]
  },
  message: {
    type: String,
    required: [true, "Message is required"]
  },
 
  course: {
    type: Schema.Types.ObjectId,
    ref: 'courses', 
    default: null
  },
  recipients: {
    type: [String],
    required: [true, "Recipients are required"],
    validate: {
      validator: function (v) {
        return v.length > 0;
      },
      message: "At least one recipient is required"
    }
  }
}, { timestamps: true });

export const AnnouncementCollection = model('announcements', announcementSchema);

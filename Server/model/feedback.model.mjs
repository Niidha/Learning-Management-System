import {model,Schema} from "mongoose"

const feedbackSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    feedback: { type: String, required: true },
    submittedAt: { type: Date, default: Date.now }
});

export const FeedbackCollection = model('Feedbacks', feedbackSchema);



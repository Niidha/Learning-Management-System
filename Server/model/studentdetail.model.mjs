// models/Student.js
import {model,Schema} from "mongoose"

const detailsSchema = new Schema({
    fullName: { type: String, required: true },
    age: { type: Number, required: true },
    qualification: { type: String, required: true },
    preferredLanguage: { type: String, required: true }
}, { timestamps: true })

export const detailsCollection = model('Student_details', detailsSchema)



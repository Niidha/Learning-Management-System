import mongoose from "mongoose";

const favSchema = new mongoose.Schema({  
    
        userId:{
            type: mongoose.Types.ObjectId,
            required:true
        },
        courseId:{
            type: mongoose.Types.ObjectId,
            require: true
        }
    },
    {
        timestamps: true
    }
    )


export const favCollection = mongoose.model("favouritess", favSchema);
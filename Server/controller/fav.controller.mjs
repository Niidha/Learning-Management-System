
import env from "dotenv"
import { favCollection } from "../model/favourites.model.mjs";

env.config();

const addToFav = async (req, res) => {
    try {
        const { user_id, course_id } = req.body;

        console.log(user_id, course_id)

        if (!user_id || !course_id) {
            return res.status(400).send({
                message: "Bad Request. Missing required fields."
            });
        }

        
        let fav = await favCollection.findOne({ userId: user_id, courseId: course_id });

        if (!fav) {
           
            await favCollection.create({ userId: user_id, courseId: course_id });
            return res.status(201).send({
                message: "Item added to fav",
                
            });
        }

       
        const response = await favCollection.updateOne({ userId: user_id, courseId: course_id },{$inc: {quantity: 1}})

        if(response.matchedCount == 1 && response.modifiedCount == 1){
            return res.status(200).send({
                message: "Item updated",
                
            });
        }

        return res.status(200).send({
            message: "No changes",
            
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).send({
            message: err.message || "Internal server error"
        });
    }
};

const getfav = async (req, res) => {
    try {
        const { userId } = req.query

        if (!userId) {
            return res.status(400).send({
                message: "Bad Request. Missing userId."
            })
        }

        const fav = await favCollection.findOne({ userId }).populate("items.courseId")

        if (!fav) {
            return res.status(404).send({
                message: "fav not found"
            })
        }

        return res.status(200).send({
            message: "fav retrieved successfully",
            fav
        })
    } catch (err) {
        console.error(err.message);
        return res.status(500).send({
            message: err.message || "Internal server error"
        })
    }
}



const removeFromfav = async (req, res) => {
    try {
        const { userId, courseId } = req.body

        if (!userId || !courseId) {
            return res.status(400).send({
                message: "Bad Request. Missing required fields."
            })
        }

        const fav = await favCollection.findOne({ userId })
        if (!fav) {
            return res.status(404).send({
                message: "fav not found"
            })
        }

        fav.items = fav.items.filter(item => item.courseId !== courseId)
        await fav.save();

        return res.status(200).send({
            message: "Item removed from fav",
            fav
        })
    } catch (err) {
        console.error(err.message);
        return res.status(500).send({
            message: err.message || "Internal server error"
        })
    }
}

export default {
    addToFav,
    getfav,
    removeFromfav
}
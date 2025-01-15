import env from "dotenv"
import cors from "cors"
import express from "express"
import userRoute from "./routes/user.route.mjs"
import dbConnect from "./config/db.config.mjs"
import VideoRoute from "./routes/video.route.mjs"
import courseRoute from "./routes/course.route.mjs"


env.config()
await dbConnect()
const app =express()
app.use(express.json())
app.use(cors())
app.use("/api/users",userRoute)
app.use('/api', VideoRoute)
app.use('/api', courseRoute)





app.listen(process.env.PORT||7000,err=>{
    if(err){
        return process.exit(1)
    }
    console.log("Running...");
    
})
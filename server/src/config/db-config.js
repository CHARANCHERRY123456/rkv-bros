import mongoose from "mongoose";
import { MONGO_URI } from "./config.js";

const connectDB = async ()=>{
    try {
        console.log("connecting to mongodb..........");
        
        const conn = await mongoose.connect(MONGO_URI);
        console.log("Mongo DB Connected" , MONGO_URI.slice(0, 8));
    } catch (error) {
        console.log("Error in connecting " , error.message);
        process.exit(1);
    }
}

export default connectDB;
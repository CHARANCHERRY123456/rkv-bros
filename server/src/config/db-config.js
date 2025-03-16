import mongoose from "mongoose";
import { MONGO_URI } from "./config.js";

const connectDB = async ()=>{
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Mongo DB Connected");
    } catch (error) {
        console.log("Error in connecting " , error.message);
        process.exit(1);
    }
}

export default connectDB;
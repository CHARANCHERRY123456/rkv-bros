// entry point of the project
import express from 'express';
import cors from "cors";
import morgan from "morgan";
import router from './src/routes/index.js';
import connectDB from './src/config/db-config.js';
connectDB();

const port = 3000;
const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/" , router);


app.listen(port , "0.0.0.0" , ()=>{
    console.log(`sever running on port ${port}`);
});
import express from 'express';
import cors from "cors";
import morgan from "morgan";
import router from './src/routes/index.js';
import connectDB from './src/config/db-config.js';
import http from 'http';
import { Server } from 'socket.io';
import SocketHandler from './src/socket/index.js';
import { errorHandler } from './src/middlewares/errorHandler.js';

connectDB();
const port = 3000;

const app = express();
const server = http.createServer(app);
const io=new Server(server , {
    cors : {
        origin : "*",
        methods :["GET","POST","PUT","DELETE"],
    },
})
SocketHandler(io);
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://rkv-bros.vercel.app"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"]
}));

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(morgan("dev"));

app.use("/" , router);

app.use(errorHandler);

server.listen(port , "0.0.0.0" , ()=>{
    console.log(`sever running on port ${port}`);
});

import express  from "express";
import AuthController from '../controllers/AuthController.js'

const authRouter = express.Router();
const authController = new AuthController();

authRouter.post("/send-otp" , authController.sendOTP);
authRouter.post("/signup",authController.signup);
authRouter.post("/login", authController.login);
authRouter.post("/google", authController.googleAuth);

export default authRouter;


import AuthServices from "../services/AuthService.js";
import {storeOTP} from '../utils/otpSotrage.js'
import { EMAIL , EMAIL_PASS } from "../config/config.js";
import transporter from "../config/emailTransporter.js";

export default class AuthController {

  constructor() {
    this.service = new AuthServices();
  }

  // Send OTP to Email
  sendOTP = async (req, res) => {
    try {
      const otp = await this.service.sendOtp(req.body.email);
      return res.json({ message: 'OTP sent successfully' , otp : otp });
    } catch (error) {
      res.status(500).json({ error: 'Failed to send OTP' });
    }
  };

  signup = async (req, res) => {
    try {
      const user = await this.service.registerUser(req.body);
      res.status(201).json({ message: "User registered successfully" , user});
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ message: error.message });
    }
  };

  login = async (req, res) => {
    try {
      console.log("Logging in");
      const token = await this.service.loginUser(req.body);
      res.status(200).json({ token });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  googleAuth = async (req, res) => {
    try {
      console.log("checking via oauth");
      const jwtToken = await this.service.googleLogin(req.body);
      res.status(200).json({ token: jwtToken });
    } catch (error) {
      res.status(400).json({ message: "Google authentication failed" });
    }
  };

}

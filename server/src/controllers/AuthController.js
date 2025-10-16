import AuthServices from "../services/AuthService.js";

export default class AuthController {

  constructor() {
    this.service = new AuthServices();
  }

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
      const token = await this.service.loginUser(req.body);
      
      res.status(200).json({ token });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  googleAuth = async (req, res) => {
    try {
      const jwtToken = await this.service.googleLogin(req.body);
      res.status(200).json({ token: jwtToken });
    } catch (error) {
      res.status(400).json({ message: "Google authentication failed" });
    }
  };

}

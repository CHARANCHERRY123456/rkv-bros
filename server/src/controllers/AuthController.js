import AuthServices from "../services/AuthService.js";

export default class AuthController {
  constructor() {
    this.service = new AuthServices();
  }

  signup = async (req, res) => {
    try {
      const user = await this.service.registerUser(req.body);
      res.status(201).json({ message: "User registered successfully" , user});
    } catch (error) {
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
      const jwtToken = await authService.googleLogin(req.body);
      res.status(200).json({ token: jwtToken });
    } catch (error) {
      res.status(400).json({ message: "Google authentication failed" });
    }
  };

}

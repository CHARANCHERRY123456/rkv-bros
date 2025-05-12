import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import useAuth from "../../contexts/AuthContext.jsx";
import GoogleLoginButton from "../GoogleLoginButton.jsx";
import envVars from "../../../config/config";

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const backendLoginUrl = `${envVars.VITE_BASE_URL}/auth/login`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(backendLoginUrl, { email, password });
      login(data.token);
      toast.success("Raaraa chaari nee kosame choostuna");
      navigate("/content");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="w-full max-w-md text-white shadow-lg rounded-lg p-6 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900">
      <h2 className="text-xl font-semibold text-center mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="w-full px-4 py-2 bg-gray-900 text-white border border-gray-500 rounded-lg focus:ring-2 focus:ring-yellow-400"
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="w-full px-4 py-2 bg-gray-900 text-white border border-gray-500 rounded-lg focus:ring-2 focus:ring-yellow-400"
        />
        <button
          type="submit"
          className="w-full bg-yellow-400 text-gray-900 font-semibold py-2 rounded-lg hover:bg-yellow-300 transition"
        >
          Login
        </button>
      </form>
      <div className="mt-4">
        <GoogleLoginButton />
      </div>
      <p className="text-center text-sm text-gray-300 mt-4">
        Don&apos;t have an account?{" "}
        <Link to="/signup" className="text-yellow-400 hover:underline">Sign Up</Link>
      </p>
    </div>
  );
}

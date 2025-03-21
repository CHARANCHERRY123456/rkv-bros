import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import useAuth from '../../contexts/AuthContext';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import GoogleLoginButton from '../GoogleLoginButton.jsx';
import envVars from '../../../config/config';
import { jwtDecode } from 'jwt-decode';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const backendLoginUrl = `${envVars.VITE_BASE_URL}/auth/login`;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        login(token);
        const redirectPath = location.state?.from?.pathname || '/content';
        navigate(redirectPath);
      } catch (error) {
        toast.error("Invalid toast");
        localStorage.removeItem('token');
      }
    }
  }, [login, navigate, location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(backendLoginUrl, { email, password });
      login(data.token);
      navigate('/content');
      toast("successfully loggedin")
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      console.error('Login error:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
        <div className="mt-4">
          <GoogleLoginButton />
        </div>
        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-600 hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

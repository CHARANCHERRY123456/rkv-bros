import React, { useState, useEffect } from 'react';
import {useLocation,useNavigate,Link } from 'react-router-dom';
import useAuth from '../../contexts/AuthContext';
import axios from 'axios';
import GoogleLoginButton from '../GoogleLoginButton.jsx';
import envVars from '../../../config/config';
import {jwtDecode} from 'jwt-decode';

const LoginPage = () => {
  
  const [email, setEmail] = useState('test@gmail.com');
  const [password, setPassword] = useState('test');
  const { login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const backendLoginUrl = `${envVars.VITE_BASE_URL}/auth/login`;

  // ✅ Check token in localStorage and redirect if valid
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        login(token); // Restore user state
        const redirectPath = location.state?.from?.pathname || '/content';
        navigate(redirectPath);
      } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem('token'); // Clear invalid token
      }
    }
  }, [login, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(backendLoginUrl, { email, password });
      login(data.token);
      navigate('/content');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
      <GoogleLoginButton />
      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default LoginPage;

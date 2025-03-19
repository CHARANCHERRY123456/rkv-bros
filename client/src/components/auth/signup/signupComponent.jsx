import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import envVars from '../../../config/config.js';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [generatedOTP, setGeneratedOTP] = useState('');
  const navigate = useNavigate();

  const sendVerificationEmail = async () => {
    try {
      const { data } = await axios.post(`${envVars.VITE_BASE_URL}/auth/send-otp`, { email });
      setGeneratedOTP(data.otp);
      setEmailSent(true);
      alert('A verification code has been sent to your email.');
    } catch (error) {
      alert('Error sending verification email:', error);
    }
  };

  const verifyEmail = () => {
    if (verificationCode === generatedOTP) {
      setIsEmailVerified(true);
      alert('Email verified successfully!');
    } else {
      alert('Invalid OTP. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEmailVerified) {
      alert('Please verify your email before signing up.');
      return;
    }
    try {
      await axios.post(`${envVars.VITE_BASE_URL}/auth/signup`, { email, password, name });
      navigate('/login');
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {!emailSent ? (
            <button
              type="button"
              onClick={sendVerificationEmail}
              className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition font-semibold"
            >
              Send Verification Code
            </button>
          ) : (
            <>
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="Enter Verification Code"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={verifyEmail}
                className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition font-semibold"
              >
                Verify Email
              </button>
            </>
          )}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create Password"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!isEmailVerified}
          />
          <button
            type="submit"
            className={`w-full py-2 rounded-lg transition font-semibold ${isEmailVerified ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-400 text-gray-700 cursor-not-allowed'}`}
            disabled={!isEmailVerified}
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;

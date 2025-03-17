import React, { useState } from 'react';
import './App.css';
import AppRouter from './components/appSetup/appRouters.jsx'
import GoogleLoginButton from './components/auth/GoogleLoginButton';
import { jwtDecode } from "jwt-decode";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = async (credentialResponse) => {
    console.log('Logged in user:', credentialResponse);
    const user = jwtDecode(credentialResponse.credential);
    console.log(user.email);
    setIsAuthenticated(true);
    sessionStorage.setItem("isLogin" , "true");
    return;

    // Example: Send the credential to your backend for verification
    try {
      const response = await fetch('/api/google-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential: credentialResponse.credential }),
      });

      if (response.ok) {
        // If verification is successful, update authentication state
        setIsAuthenticated(true);
      } else {
        console.error('Server verification failed.');
      }
    } catch (error) {
      console.error('An error occurred during verification:', error);
    }
  };

  const handleLoginFailure = () => {
    console.log('Login Failed');
  };

  return <AppRouter />
}

export default App;

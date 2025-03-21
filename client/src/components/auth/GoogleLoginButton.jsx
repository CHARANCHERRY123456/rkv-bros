import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import useAuth from '../contexts/AuthContext';
import envVars from '../../config/config.js'

import axios from 'axios';
import { toast } from 'react-hot-toast';

const backendHandleSucessUrl = `${envVars.VITE_BASE_URL}/auth/google`;
const googleClientId = `${envVars.VITE_GOOGLE_CLIENT_ID}`

const GoogleLoginButton = () => {
  const { login } = useAuth();

  const handleSuccess = async (credentialResponse) => {
    try {
      const { data } = await axios.post(backendHandleSucessUrl, {
        token: credentialResponse.credential,
      });

      login(data.token);
    } catch (error) {
      toast.error('Google login error:');
      console.log(error.message);
    }
  };

  const handleError = () => {
    toast.error('Google login failed');
  };

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;

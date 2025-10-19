import { GoogleLogin } from '@react-oauth/google';
import useAuth from '../contexts/AuthContext';
import envVars from '../../config/config.js'

import axios from 'axios';
import { toast } from 'react-hot-toast';

const backendHandleSucessUrl = `${envVars.VITE_BASE_URL}/auth/google`;

const GoogleLoginButton = () => {
  const { login } = useAuth();

  const handleSuccess = async (credentialResponse) => {
    try {
      const { data } = await axios.post(backendHandleSucessUrl, {
        token: credentialResponse.credential,
      });

      login(data.token);
      toast.success('Raara chaari ra neekosame choostuna');
    } catch (error) {
      toast.error('Bro goodle bro ninnu tidthunaad');
      console.error(error.message);
    }
  };

  const handleError = () => {
    toast.error('Bro sorry google not accepting you ');
  };

  return <GoogleLogin onSuccess={handleSuccess} onError={handleError} />;
};

export default GoogleLoginButton;

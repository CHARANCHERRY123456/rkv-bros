import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const GoogleLoginButton = ({ onSuccess, onError }) => (
  <GoogleLogin
    onSuccess={credentialResponse => {
      console.log('Google Login Success:', credentialResponse);
      onSuccess(credentialResponse);
    }}
    onError={() => {
      console.log('Google Login Failed');
      onError();
    }}
  />
);

export default GoogleLoginButton;

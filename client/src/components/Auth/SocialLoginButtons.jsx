import React from 'react';
import { Button, Stack } from '@mui/material';
import { auth, googleProvider, facebookProvider, appleProvider } from '../../firebase/config';
import { signInWithPopup } from 'firebase/auth';

function SocialLoginButtons() {
  const handleLogin = (provider) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log('User signed in:', result.user);
      })
      .catch((error) => {
        console.error('Authentication error:', error);
      });
  };

  return React.createElement(
    Stack,
    { spacing: 2 },
    React.createElement(
      Button,
      { variant: 'contained', onClick: () => handleLogin(googleProvider) },
      'Sign in with Google'
    ),
    React.createElement(
      Button,
      { variant: 'contained', onClick: () => handleLogin(facebookProvider) },
      'Sign in with Facebook'
    ),
    React.createElement(
      Button,
      { variant: 'contained', onClick: () => handleLogin(appleProvider) },
      'Sign in with Apple'
    )
  );
}

export default SocialLoginButtons;

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import SocialLoginButtons from './SocialLoginButtons';

function LoginPage() {
  return React.createElement(
    Box,
    {
      sx: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
      },
    },
    React.createElement(
      Paper,
      {
        elevation: 3,
        sx: { padding: 4, maxWidth: 400, width: '100%' },
      },
      React.createElement(
        Typography,
        { variant: 'h5', gutterBottom: true },
        'Welcome to QuickMart'
      ),
      React.createElement(SocialLoginButtons, null)
    )
  );
}

export default LoginPage;

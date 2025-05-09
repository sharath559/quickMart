import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Avatar,
  Button,
  Box,
  Typography,
  Container,
  Paper,
  Card,
  CardContent,
  Alert
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Dashboard() {
  const { currentUser, logout } = useAuth();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleLogout() {
    setError('');

    try {
      await logout();
      navigate('/login');
    } catch {
      setError('Failed to log out');
    }
  }

  return (
    <Container component="main" maxWidth="md">
      <Paper elevation={6} sx={{ p: 4, mt: 8 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main', width: 56, height: 56 }}>
            <AccountCircleIcon fontSize="large" />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
            Profile
          </Typography>
          {error && <Alert severity="error" sx={{ mb: 2, width: '100%' }}>{error}</Alert>}
          
          <Card sx={{ width: '100%', mb: 3 }}>
            <CardContent>
              <Typography variant="h6" component="div" gutterBottom>
                Email: {currentUser.email}
              </Typography>
              <Typography color="text.secondary">
                {currentUser.emailVerified 
                  ? 'Email verified' 
                  : 'Email not verified - Please check your inbox to verify your email'}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                User ID: {currentUser.uid}
              </Typography>
              <Typography variant="body2">
                Account created: {currentUser.metadata.creationTime}
              </Typography>
            </CardContent>
          </Card>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              onClick={() => navigate('/update-profile')}
            >
              Update Profile
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleLogout}
            >
              Log Out
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
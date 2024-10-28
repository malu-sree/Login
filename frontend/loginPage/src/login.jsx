// src/components/AuthForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Container, Paper, Switch, FormControlLabel } from '@mui/material';
import { AccountCircle, Lock, LockOpen, PersonAdd, Mail } from '@mui/icons-material';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = async () => {
    const endpoint = isLogin ? '/login' : '/register';
    try {
      const response = await axios.post(`http://localhost:5000/api/auth${endpoint}`, {
        username,
        password,
        email: isLogin ? undefined : email, // Only send email if registering
      });
      alert(response.data.msg);
    } catch (error) {
      alert(error.response.data.msg || 'Error');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: '2em', borderRadius: '10px' }}>
        <Typography variant="h4" align="center" gutterBottom>
          {isLogin ? 'Login' : 'Register'}
        </Typography>
        
        <TextField
          fullWidth
          variant="outlined"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          InputProps={{
            startAdornment: <AccountCircle style={{ marginRight: '8px' }} />,
          }}
          style={{ marginBottom: '1em' }}
        />

        {!isLogin && (
          <TextField
            fullWidth
            variant="outlined"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: <Mail style={{ marginRight: '8px' }} />,
            }}
            style={{ marginBottom: '1em' }}
          />
        )}

        <TextField
          fullWidth
          variant="outlined"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            startAdornment: <Lock style={{ marginRight: '8px' }} />,
          }}
          style={{ marginBottom: '1em' }}
        />
        
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleAuth} 
          style={{ width: '100%', padding: '1em', marginBottom: '1em' }}
        >
          {isLogin ? <LockOpen style={{ marginRight: '8px' }} /> : <PersonAdd style={{ marginRight: '8px' }} />} 
          {isLogin ? 'Login' : 'Register'}
        </Button>

        <FormControlLabel
          control={
            <Switch
              checked={!isLogin}
              onChange={() => setIsLogin(!isLogin)}
              color="primary"
            />
          }
          label={isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
          style={{ textAlign: 'center' }}
        />
      </Paper>
    </Container>
  );
};

export default Login;

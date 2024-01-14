// LoginForm.js
import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = ({ history }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      console.log(`Authenticating user: ${username}`);
      const response = await axios.post('/api/login', { username, password });
      console.log(`Response: ${JSON.stringify(response.data)}`);
      localStorage.setItem('token', response.data.token);
      history.push('/chat');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginForm;
// src/components/SignIn.js
import React, { useState } from 'react';
import axios from 'axios';

const SignIn = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/api/auth/signin', {
        email,
        password,
      });

      if (response.status === 200) {
        setResponseMessage('Sign in successful!');
        onClose();
      } else {
        setResponseMessage('Invalid credentials');
      }
    } catch (error) {
      console.error('Error signing in:', error);
      setResponseMessage('Error signing in');
    }
  };

  return (
    <div>
      <form id="signin-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit">Sign In</button>
      </form>
      <p id="response-message">{responseMessage}</p>
    </div>
  );
};

export default SignIn;
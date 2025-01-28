// src/components/SignUp.js
import React, { useState } from 'react';
import axios from 'axios';

const SignUp = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [loading, setLoading] = useState(false); // Loading state

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Set loading to true

    try {
      const response = await axios.post('http://localhost:4000/api/auth/signup', {
        username,
        email,
        password,
      });

      if (response.status === 201) {
        setResponseMessage('User  created successfully!');
        onClose(); // Close the modal or redirect
      } else {
        setResponseMessage('Error creating user');
      }
    } catch (error) {
      console.error('Error signing up:', error);
      setResponseMessage(error.response?.data?.message || 'Error signing up');
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div>
      <form id="signup-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          required
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
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
        <button type="submit" disabled={loading}>
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>
      <p id="response-message">{responseMessage}</p>
    </div>
  );
};

export default SignUp;
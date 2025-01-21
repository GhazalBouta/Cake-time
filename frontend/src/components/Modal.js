import React, { useState } from 'react';
import axios from 'axios';

const Modal = ({ isSignUp, onClose, onToggle }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (isSignUp) {
        const response = await axios.post('http://localhost:4000/api/auth/signup', {
          username,
          email,
          password,
        });

        if (response.status === 201) {
          setResponseMessage('User created successfully!');
          onClose();
        } else {
          setResponseMessage('Error creating user');
        }
      } else {
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
      }
    } catch (error) {
      console.error('Error:', error);
      setResponseMessage('Error');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>&times;</button>
        <form id="auth-form" onSubmit={handleSubmit}>
          {isSignUp && (
            <input
              type="text"
              name="username"
              placeholder="Username"
              required
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          )}
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
          <button type="submit">
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
          <p>
            {isSignUp ? 'Already have an account?' : 'Don\'t have an account?'}
            <button type="button" onClick={onToggle}>
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </form>
        <p id="response-message">{responseMessage}</p>
      </div>
    </div>
  );
};

export default Modal;

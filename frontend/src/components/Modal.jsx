import React, { useState } from 'react';
import axios from 'axios';
import '../CSS/Auth.css';

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
          // Store the token from response
          if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            // Store user data if available
            if (response.data.user) {
              localStorage.setItem('user', JSON.stringify(response.data.user));
            }
            setResponseMessage('User created successfully!');
            onClose();
            window.location.reload(); // Refresh to update auth state
          }
        } else {
          setResponseMessage('Error creating user');
        }
      } else {
        const response = await axios.post('http://localhost:4000/api/auth/signin', {
          email,
          password,
        });

        if (response.status === 200) {
          // Store the token from response
          if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            // Store user data if available
            if (response.data.user) {
              localStorage.setItem('user', JSON.stringify(response.data.user));
            }
            setResponseMessage('Sign in successful!');
            onClose();
            window.location.reload(); // Refresh to update auth state
          }
        } else {
          setResponseMessage('Invalid credentials');
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setResponseMessage(
        error.response?.data?.message || 
        'An error occurred. Please try again.'
      );
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>&times;</button>
        <h2>{isSignUp ? 'Create Account' : 'Sign In'}</h2>
        
        {responseMessage && (
          <p className={responseMessage.includes('success') ? 'success-message' : 'error-message'}>
            {responseMessage}
          </p>
        )}
        
        <form id="auth-form" onSubmit={handleSubmit}>
          {isSignUp && (
            <input
              type="text"
              name="username"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            minLength="6"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
          <p className="toggle-text">
            {isSignUp ? 'Already have an account?' : 'Don\'t have an account?'}
            <button type="button" onClick={onToggle} className="toggle-btn">
              {isSignUp ? ' Sign In' : ' Sign Up'}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Modal;
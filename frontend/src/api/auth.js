// frontend/src/api/auth.js
import axios from 'axios';

const API_URL = 'http://localhost:4000/api';

// Set auth token
const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

// Sign up a new user
export const signup = async userData => {
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, userData);
    const { token } = response.data;
    localStorage.setItem('token', token);
    setAuthToken(token);
    return response.data;
  } catch (error) {
    console.error('Signup error:', error.response?.data || error.message);
    throw error;
  }
};

// Sign in user
export const signin = async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/auth/signin`, credentials);
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      return { token, user };
    } catch (error) {
      console.error('Sign in error:', error.response?.data || error.message);
      throw error;
    }
  };
// Get current user
export const getCurrentUser = async () => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    setAuthToken(token);
    const response = await axios.get(`${API_URL}/auth/me`);
    return response.data;
  } catch (error) {
    console.error('Get current user error:', error);
    localStorage.removeItem('token');
    setAuthToken(null);
    return null;
  }
};

// Logout
export const logout = () => {
  localStorage.removeItem('token');
  setAuthToken(null);
};
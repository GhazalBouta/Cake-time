// src/axiosInstanse.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://your-api-url.com', // Replace with your API URL
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
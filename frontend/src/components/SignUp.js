import React, { useState } from 'react';
import '../CSS/Signin-up.css';


const Signup = () => {
    const [responseMessage, setResponseMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const username = event.target.username.value;
        const email = event.target.email.value;
        const password = event.target.password.value;

        try {
            const response = await fetch('http://localhost:5000/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }

            const data = await response.json();
            setResponseMessage(`User  created successfully! User ID: ${data.userId}`);

            // Optionally redirect or clear form fields here
        } catch (error) {
            console.error('Error signing up:', error);
            setResponseMessage(`Error signing up: ${error.message}`);
        }
    };

    return (
        <div>
            <form id="signup-form" onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Username" required />
                <input type="email" name="email" placeholder="Email" required />
                <input type="password" name="password" placeholder="Password" required />
                <button type="submit">Sign Up</button>
            </form>
            <p id="response-message">{responseMessage}</p>
        </div>
    );
};




export default Signup;

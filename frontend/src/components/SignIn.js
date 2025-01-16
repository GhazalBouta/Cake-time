import React, { useState } from 'react';
import '../CSS/Signin-up.css';


const Signin = () => {
    const [responseMessage, setResponseMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;

        try {
            const response = await fetch('http://localhost:5000/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }

            const data = await response.json();
            setResponseMessage(`Welcome back! User ID: ${data.userId}`);
        } catch (error) {
            console.error('Error signing in:', error);
            setResponseMessage(`Error signing in: ${error.message}`);
        }
    };

    return (
        <div>
            <form id="signin-form" onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="Email" required />
                <input type="password" name="password" placeholder="Password" required />
                <button type="submit">Sign In</button>
            </form>
            <p id="response-message">{responseMessage}</p>
        </div>
    );
};

export default Signin;
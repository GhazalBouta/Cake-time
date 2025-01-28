import React from 'react';
import '../CSS/Contact.css'; // Create this CSS file for styles

const Contact = () => {
  return (
    <div className="contact-form">
      <h1>Your Questions and Opinions <br /> are welcome</h1>
      <div className="txtb">
        <label>Email</label>
        <input type="email" placeholder="Enter Your Email" />
      </div>
      <div className="txtb">
        <label>Full Name</label>
        <input type="text" placeholder="Enter Your Name" />
      </div>
      <div className="txtb">
        <label>Phone number (optional)</label>
        <input type="text" placeholder="Enter Your Phone Number" />
      </div>
      <div className="txtb">
        <label>Message:</label>
        <textarea placeholder="Enter your message"></textarea>
      </div>
      <a className="btn" href="#!">
  {/* Add a placeholder href */}
  Send
</a>
    </div>
  );
};

export default Contact;
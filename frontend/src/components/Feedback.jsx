import React, { useState } from 'react';
import '../CSS/Feedback.css';

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: '',
    comment: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingSelect = (rating) => {
    setFormData(prev => ({
      ...prev,
      rating
    }));
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:4000/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setSubmitted(true);
      
      // Reset form after submission
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          rating: '',
          comment: ''
        });
        setSubmitted(false);
      }, 3000);

    } catch (err) {
      setError(err.message);
      console.error('Error submitting feedback:', err);
    }
  };

  return (
    <section className="feedback-section">
      <h2>How satisfied are you with our cakes?</h2>
      
      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      {submitted ? (
        <div className="success-message">
          <p>Thank you for your feedback! 🎉</p>
        </div>
      ) : (
        <form onSubmit={handleReviewSubmit}>
          <div className="rating">
            <div 
              className={`child unhappy ${formData.rating === 'unhappy' ? 'selected' : ''}`}
              onClick={() => handleRatingSelect('unhappy')}
            >
              <p>&#x1F613;</p>
              <h3>Unhappy</h3>
            </div>
            <div 
              className={`child happy ${formData.rating === 'happy' ? 'selected' : ''}`}
              onClick={() => handleRatingSelect('happy')}
            >
              <p>&#128512;</p>
              <h3>Happy</h3>
            </div>
            <div 
              className={`child satisfied ${formData.rating === 'satisfied' ? 'selected' : ''}`}
              onClick={() => handleRatingSelect('satisfied')}
            >
              <p>&#128525;</p>
              <h3>Satisfied</h3>
            </div>
          </div>

          <div className="form-group">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your Name"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Your Email"
              required
            />
          </div>

          <div className="form-group">
            <textarea
              name="comment"
              value={formData.comment}
              onChange={handleInputChange}
              placeholder="Please share your experience with us..."
              required
              rows="4"
            />
          </div>

          <div className="feedback-btn">
            <button 
              type="submit"
              disabled={!formData.rating || !formData.name || !formData.comment || !formData.email}
            >
              Send Review
            </button>
          </div>
        </form>
      )}
    </section>
  );
};

export default Feedback;
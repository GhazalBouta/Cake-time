import React from 'react';
import '../CSS/Feedback.css'; // Make sure to import your CSS file

const Feedback = () => {
  const handleReviewSubmit = () => {
    // Logic to handle the review submission can be added here
    alert('Review submitted!');
  };

  return (
    <section className="feedback-section">
      <h2>How satisfied are you<br /> with our cakes?</h2>
      <div className="rating">
        <div className="child unhappy">
          <p>&#x1F613;</p>
          <h3>Unhappy</h3>
        </div>
        <div className="child happy">
          <p>&#128512;</p>
          <h3>Happy</h3>
        </div>
        <div className="child satisfied">
          <p>&#128525;</p>
          <h3>Satisfied</h3>
        </div>
      </div>
      <div className="feedback-btn">
        <button id="btn" type="button" onClick={handleReviewSubmit}>Send Review</button>
      </div>
    </section>
  );
};

export default Feedback;
import React, { useState } from 'react';
import styles from '../styles/RatingSystem.module.css';

const RatingSystem = () => {
  const [rating, setRating] = useState(0);
  const [street, setStreet] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleRating = (value) => {
    setRating(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/ratings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ street, rating }),
      });

      if (response.ok) {
        alert('Rating submitted successfully! 🎉');
        setRating(0);
        setStreet('');
      } else {
        alert('Failed to submit rating. Please try again. 😕');
      }
    } catch (error) {
      console.error('Error submitting rating:', error);
      alert('An error occurred. Please try again later. 😔');
    }
  };

  return (
    <div className={styles.ratingSystem}>
      <h2>Rate Street Walkability 🚶‍♂️</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          placeholder="Enter street name"
          required
          className={styles.streetInput}
        />
        <div className={styles.dosaRating}>
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => handleRating(value)}
              onMouseEnter={() => setHoveredRating(value)}
              onMouseLeave={() => setHoveredRating(0)}
              className={`${styles.dosaButton} ${value <= (hoveredRating || rating) ? styles.active : ''}`}
            >
              🥘
            </button>
          ))}
        </div>
        <p className={styles.ratingText}>
          {rating ? `You rated this street ${rating} ${rating === 1 ? 'dosa' : 'dosas'}!` : 'Rate this street'}
        </p>
        <button type="submit" className={`btn btn-primary ${styles.submitButton}`}>
          Submit Rating
        </button>
      </form>
    </div>
  );
};

export default RatingSystem;
import React, { useState } from 'react';
import styles from '../styles/ComfortableTrailFinder.module.css';

const ComfortableTrailFinder = () => {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [route, setRoute] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/comfortable-route', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ start, end }),
      });

      if (response.ok) {
        const data = await response.json();
        setRoute(data.route);
      } else {
        alert('Failed to find a comfortable route. Please try again. 😕');
      }
    } catch (error) {
      console.error('Error finding comfortable route:', error);
      alert('An error occurred. Please try again later. 😔');
    }
  };

  return (
    <div className={styles.comfortableTrailFinder}>
      <h2>Find Comfortable Trail 🗺️</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          placeholder="Start location"
          required
          className={styles.locationInput}
        />
        <input
          type="text"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          placeholder="End location"
          required
          className={styles.locationInput}
        />
        <button type="submit" className={`btn btn-primary ${styles.findButton}`}>
          Find Comfortable Route
        </button>
      </form>
      {route && (
        <div className={styles.routeResult}>
          <h3>Suggested Comfortable Route:</h3>
          <ol>
            {route.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export default ComfortableTrailFinder;
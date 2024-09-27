import React, { useState } from 'react';
import styles from '../styles/LandmarkAdder.module.css';

const LandmarkAdder = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [location, setLocation] = useState('');

  const landmarkTypes = [
    { value: 'restaurant', label: 'Restaurant 🍽️' },
    { value: 'park', label: 'Park 🌳' },
    { value: 'shop', label: 'Shop 🛍️' },
    { value: 'monument', label: 'Monument 🗽' },
    { value: 'other', label: 'Other 🏷️' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/landmarks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, type, location }),
      });

      if (response.ok) {
        alert('Landmark added successfully! 🎉');
        setName('');
        setType('');
        setLocation('');
      } else {
        alert('Failed to add landmark. Please try again. 😕');
      }
    } catch (error) {
      console.error('Error adding landmark:', error);
      alert('An error occurred. Please try again later. 😔');
    }
  };

  return (
    <div className={styles.landmarkAdder}>
      <h2>Add Landmark 🗺️</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Landmark name"
          required
          className={styles.input}
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
          className={styles.select}
        >
          <option value="">Select landmark type</option>
          {landmarkTypes.map((lt) => (
            <option key={lt.value} value={lt.value}>{lt.label}</option>
          ))}
        </select>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location (e.g., street name)"
          required
          className={styles.input}
        />
        <button type="submit" className={`btn btn-primary ${styles.addButton}`}>
          Add Landmark
        </button>
      </form>
    </div>
  );
};

export default LandmarkAdder;
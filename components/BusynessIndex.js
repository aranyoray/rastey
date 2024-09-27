import React, { useEffect, useState } from 'react';

const BusynessIndex = () => {
  const [busynessData, setBusynessData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch busyness data using Google Maps Places API
    const fetchBusynessData = async () => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=12.9716,77.5946&radius=1500&type=store&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
        );
        const data = await response.json();
        setBusynessData(data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching busyness data:", error);
        setLoading(false);
      }
    };

    fetchBusynessData();
  }, []);

  if (loading) {
    return <p>Loading busyness data...</p>;
  }

  if (!busynessData) {
    return <p>No busyness data available</p>;
  }

  return (
    <div>
      <h2>Busyness Index</h2>
      <ul>
        {busynessData.map((place) => (
          <li key={place.place_id}>
            {place.name} - {place.user_ratings_total} people rated this place.
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BusynessIndex;
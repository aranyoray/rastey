// pages/api/busyness.js

import { Client } from '@googlemaps/google-maps-services-js';

const client = new Client({});

export default async function handler(req, res) {
  try {
    const { lat, lng } = req.query; // Pass latitude and longitude from the frontend

    const response = await client.placesNearby({
      params: {
        location: { lat: parseFloat(lat), lng: parseFloat(lng) },
        radius: 5000,  // Radius in meters
        type: 'point_of_interest',  // Can adjust based on desired data (e.g., 'restaurant', 'cafe', etc.)
        key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
      },
    });

    const places = response.data.results.map(place => ({
      name: place.name,
      lat: place.geometry.location.lat,
      lng: place.geometry.location.lng,
      rating: place.rating || 'No rating',
      busyness_level: Math.random() * 100,  // Mock busyness data; replace with real-time data if available
    }));

    res.status(200).json(places);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching busyness data' });
  }
}
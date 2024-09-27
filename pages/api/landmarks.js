// pages/api/landmarks.js

import { Client } from '@googlemaps/google-maps-services-js';

const client = new Client({});

export default async function handler(req, res) {
  try {
    const { lat, lng } = req.query;

    const response = await client.placesNearby({
      params: {
        location: { lat: parseFloat(lat), lng: parseFloat(lng) },
        radius: 5000,
        type: 'landmark',
        key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
      },
    });

    const landmarks = response.data.results.map(landmark => ({
      name: landmark.name,
      lat: landmark.geometry.location.lat,
      lng: landmark.geometry.location.lng,
    }));

    res.status(200).json(landmarks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching landmarks' });
  }
}
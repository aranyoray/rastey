// pages/api/ratings.js

let ratingsData = [];  // You can replace this with a database in production

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(ratingsData);
  } else if (req.method === 'POST') {
    const { location, rating } = req.body;

    if (!location || typeof rating !== 'number') {
      return res.status(400).json({ error: 'Invalid data' });
    }

    // Save the rating for the location
    ratingsData.push({ location, rating });
    res.status(201).json({ message: 'Rating saved' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
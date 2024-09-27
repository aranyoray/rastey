// utils/api.js

import axios from "axios";

export const fetchData = async (endpoint, params = {}) => {
  try {
    const response = await axios.get(endpoint, { params });
    return response.data;
  } catch (error) {
    console.error("API error:", error);
    return null;
  }
};
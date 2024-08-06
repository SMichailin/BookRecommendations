import axios from 'axios';

export const fetchGenres = async () => {
  try {
    const token = localStorage.getItem('authToken'); // Get token from localStorage
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/genres`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching genres:', error);
    throw error;
  }
};

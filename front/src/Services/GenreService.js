import axios from 'axios';

export const addGenre = async (genre) => {
  const token = localStorage.getItem('authToken');
  try {
    const response = await axios.post('http://localhost:8080/api/genres', genre, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error adding genre:', error);
    throw error;
  }
};

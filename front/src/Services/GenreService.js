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
const API_URL_2 = 'http://localhost:8080/api/genres'; // Adjust the URL if necessary

export const fetchGenres = async () => {
  const token = localStorage.getItem('authToken');
  try {
    const response = await axios.get(API_URL_2, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching genres:', error);
    throw error;
  }
};

export const updateGenre = async (id, name) => {
  const token = localStorage.getItem('authToken');
  try {
    await axios.put(`${API_URL_2}/${id}`, { name }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error updating genre:', error);
    throw error;
  }
};

export const deleteGenre = async (id) => {
  const token = localStorage.getItem('authToken');
  try {
    await axios.delete(`${API_URL_2}/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  } catch (error) {
    console.error('Error deleting genre:', error);
    throw error;
  }
};
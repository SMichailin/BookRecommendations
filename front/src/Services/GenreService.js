import axios from 'axios';

export const addGenre = async (genreData) => {
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/genres`, genreData);
  return response.data;
};

export const getGenres = async () => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/genres`);
  return response.data;
};

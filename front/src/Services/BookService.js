import axios from 'axios';

export const addBook = async (bookData) => {
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/books`, bookData);
  return response.data;
};

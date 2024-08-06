import axios from 'axios';

export const addBook = async (bookData) => {
  const token = localStorage.getItem('authToken'); // Get token from localStorage
  try {
    const response = await axios.post('http://localhost:8080/api/books', bookData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error adding book:', error.response); // Log detailed error
    throw error;
  }
};
export const fetchBooks = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/books');
    return response.data; 
  } catch (error) {
    console.error('Error fetching books:', error.response); 
    throw error; 
  }
};
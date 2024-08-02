import axios from 'axios';

export const loginUser = async (formData) => {
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/login`, formData);
  return response.data;
};

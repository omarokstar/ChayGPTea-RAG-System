import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const sendMessageToApi = async (messages) => {
  try {
    const response = await api.post('/chat', { messages });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 429) {
      throw new Error(error.response.data.reply || 'Too many requests. Please try again later.');
    }
    throw new Error('Failed to connect to the server. Please check your network.');
  }
};

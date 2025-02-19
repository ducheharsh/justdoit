import axios from 'axios';
import { config } from './env';
const baseURL = config.NEXT_PUBLIC_API_URL || config.NEXT_PUBLIC_API_URL_LOCAL;

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for authentication
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
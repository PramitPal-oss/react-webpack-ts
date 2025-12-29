import axios from 'axios';
import { setupInterceptors } from './interceptors';

export const apiClient = axios.create({
  baseURL: `${process.env.BASE_URL}/${process.env.CONFIG_URL}`,
  withCredentials: true, // ✅ IMPORTANT (httpOnly cookies)
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

setupInterceptors(apiClient);

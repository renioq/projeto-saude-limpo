import axios from 'axios';

const unitApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE
});

// Adiciona token JWT automaticamente em cada requisição
unitApi.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default unitApi;

import axios from 'axios';

const articleApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE
});

export default articleApi;

import axios from 'axios';

const unitApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE
});

export default unitApi;

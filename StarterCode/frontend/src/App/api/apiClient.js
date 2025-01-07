import axios from 'axios';
import {v4 as uuidv4} from 'uuid';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || 'http://localhost:5000'
});

apiClient.interceptors.request.use(config => {
  config.headers['x-request-id'] = uuidv4(); // Generate a unique request ID
  return config;
});

export default apiClient;

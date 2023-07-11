import axios from 'axios';
import envConfig from '../config';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  (config) => {
    // Modify the request config
    config.headers.Authorization =
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiMSIsInJvbGUiOiJTdXBlciBBZG1pbiIsIm5iZiI6MTY4ODY0Mjg1MywiZXhwIjoxNjg4NzI5MjUzLCJpYXQiOjE2ODg2NDI4NTN9.GI4pXZIFOHIYss3MKlOOv-aydCylB6u62iGN1dMvhlU';
    if (config.url && envConfig.baseUrl) {
      config.url = envConfig.baseUrl + config.url;
    }
    return config;
  },
  (error) => {
    // Handle the request error
    return Promise.reject(error);
  }
);

export default axiosInstance;

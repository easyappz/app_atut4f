import instance from './axios';

export const registerUser = async (userData) => {
  const response = await instance.post('/api/register/', userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await instance.post('/api/login/', credentials);
  return response.data;
};

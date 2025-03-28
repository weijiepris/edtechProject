import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../utils/constants';

const API_CREATE = axios.create({
  baseURL: BASE_URL
});

export const useAxios = async () => {
  const token = await AsyncStorage.getItem('token');

  return API_CREATE.interceptors.request.use(
    config => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    error => Promise.reject(error)
  );
};

import axios, { AxiosInstance } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../utils/constants';
import { useExpoRouter } from 'expo-router/build/global-state/router-store';
import Toast from 'react-native-toast-message';

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

let isInterceptorSet = false;

export const setupAxios = async () => {
  const router = useExpoRouter();
  if (isInterceptorSet) return;

  api.interceptors.request.use(
    async config => {
      const token = await AsyncStorage.getItem('token');

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    error => console.log('{error}', error),
  );

  isInterceptorSet = true;
};

export default api;

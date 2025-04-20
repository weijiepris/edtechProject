import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../utils/constants';
import { RouterStore } from 'expo-router/build/global-state/router-store';
import api from '../config/axios';

export const handleLogin = async ({
  email,
  password,
  validateToken,
  fn,
}: {
  email: string;
  password: string;
  validateToken: Function;
  fn: Function;
}) => {
  api
    .post(`${BASE_URL}/auth/login`, { email, password })
    .then(async (response: any) => {
      const { token } = response.data;

      await AsyncStorage.setItem('token', token).then(() => {
        validateToken(true);
      });
    })
    .catch((err: any) => {
      fn(err.response.data.message);
    });
};

export const handleLogout = async (validateToken: Function) => {
  try {
    await AsyncStorage.removeItem('token');
    api
      .post(`${BASE_URL}/auth/logout`)
      .then(async (response: any) => {
        validateToken();
      })
      .catch((err: any) => {});
  } catch (err: any) {
    console.error('Logout error:', err?.message || err);
  }
};

export const handleRegister = async ({
  firstName,
  lastName,
  age,
  email,
  password,
  validateToken,
  onError,
  router,
}: {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  password: string;
  validateToken: Function;
  onError: (msg: string) => void;
  router: RouterStore;
}) => {
  try {
    const response = api.post(`${BASE_URL}/auth/register`, {
      firstName,
      lastName,
      age,
      email,
      password,
    });

    router.replace('/login');
  } catch (err: any) {
    const message = err?.response?.data?.message || 'Registration failed';
    onError(message);
  }
};

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useAxios } from '../config/axios';
import { RouterStore } from 'expo-router/build/global-state/router-store';
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
  const api = await useAxios();

  console.log(BASE_URL);
  await axios
    .post(`${BASE_URL}/auth/login`, { email, password })
    .then(async response => {
      console.log('success', response);

      const { token } = response.data;

      await AsyncStorage.setItem('token', token).then(() => {
        validateToken(true);
      });
    })
    .catch(err => {
      fn(err.response.data.message);
      console.log(`${err.response.data.message}`);
    });
};

export const handleLogout = async (validateToken: Function) => {
  try {
    await AsyncStorage.removeItem('token');
    await axios
      .post(`${BASE_URL}/auth/logout`)
      .then(async response => {
        console.log('success', response);
        validateToken();
      })
      .catch(err => {
        console.log(`${err.response.data.message}`);
      });
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
    const response = await axios.post(`${BASE_URL}/auth/register`, {
      firstName,
      lastName,
      age,
      email,
      password,
    });

    console.log(response);
    router.replace('/login');
  } catch (err: any) {
    const message = err?.response?.data?.message || 'Registration failed';
    console.log('Register error:', message);
    onError(message);
  }
};

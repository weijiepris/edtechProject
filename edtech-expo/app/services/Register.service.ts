import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { RouterStore } from 'expo-router/build/global-state/router-store';

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

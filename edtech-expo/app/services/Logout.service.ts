import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';

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

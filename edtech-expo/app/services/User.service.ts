import api from '../config/axios';
import { BASE_URL } from '../utils/constants';

export const getProfile = async () => {
  try {
    const response = await api.get(`${BASE_URL}/user/profile`);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching profile:', error?.response?.data || error.message);
    throw error;
  }
};

export const updateProfile = async ({
  age,
  email,
  firstName,
  lastName,
}: {
  firstName?: string;
  lastName?: string;
  age?: number;
  email?: string;
}) => {
  try {
    const response = await api.patch(`${BASE_URL}/user/profile`, {
      age,
      email,
      firstName,
      lastName,
    });

    return response.data;
  } catch (error: any) {
    console.error('Profile update failed:', error?.response?.data || error.message);
    throw error;
  }
};

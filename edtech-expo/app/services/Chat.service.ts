import api from '../config/axios';
import { BASE_URL } from '../utils/constants';

export const fetchChatPartners = async () => {
  const res = await api.get(`${BASE_URL}/chat`);
  return res.data;
};

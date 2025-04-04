// src/services/Student.service.ts
import api from '../config/axios';
import { BASE_URL } from '../utils/constants';

export const fetchStudentClasses = async () => {
  const response = await api.get(`${BASE_URL}/student/class`);
  return response.data; // array of class objects
};

import api from '../config/axios';
import { BASE_URL, IClass } from '../utils/constants';

export const fetchAssignmentDetails = async (assignmentId: string) => {
  const res = await api.get(`${BASE_URL}/assignment/${assignmentId}`);
  return res.data;
};

export const submitAssignment = async (assignmentId: string, content: string) => {
  const res = await api.post(`${BASE_URL}/assignment/${assignmentId}/submit`, { content });
  return res.data;
};

export const fetchAssignmentGrades = async (assignmentId: string): Promise<IClass> => {
  const res = await api.get(`${BASE_URL}/assignment/${assignmentId}/grades`);
  return res.data;
};

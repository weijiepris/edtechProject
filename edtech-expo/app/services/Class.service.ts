import api from '../config/axios';
import { BASE_URL, IAssignment, IStudentClass } from '../utils/constants';

export const fetchStudentClasses = async (): Promise<IStudentClass[]> => {
  const response = await api.get(`${BASE_URL}/student/class`);
  return response.data;
};

export const fetchAssignmentsByClass = async (classUuid: string): Promise<IAssignment[]> => {
  const response = await api.get(`/student/assignment/${classUuid}`);
  return response.data;
};

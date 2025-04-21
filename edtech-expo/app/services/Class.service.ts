import api from '../config/axios';
import { BASE_URL, IAssignment, IClass, IStudentClass, ISubmission } from '../utils/constants';

export const fetchStudentClasses = async (): Promise<IStudentClass[]> => {
  const response = await api.get(`${BASE_URL}/student/class`);
  return response.data;
};

export const fetchTeacherClasses = async (): Promise<IStudentClass[]> => {
  const response = await api.get(`${BASE_URL}/teacher/class`);
  return response.data;
};

export const fetchAssignmentsByClass = async (classUuid: string): Promise<IClass> => {
  const response = await api.get(`/student/assignment/${classUuid}`);
  return response.data;
};

export const fetchSubmissionsByCourse = async (courseUuid: string): Promise<ISubmission[]> => {
  const res = await api.get(`${BASE_URL}/teacher/class/${courseUuid}/submissions`);
  return res.data;
};

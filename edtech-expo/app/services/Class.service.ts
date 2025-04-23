import api from '../config/axios';
import { BASE_URL, IClass, IStudentClass, ISubmission, IUser } from '../utils/constants';

export const fetchStudentClasses = async (): Promise<IStudentClass[]> => {
  const response = await api.get(`${BASE_URL}/student/class`);
  return response.data;
};

export const fetchTeacherClasses = async (): Promise<IStudentClass[]> => {
  const response = await api.get(`${BASE_URL}/teacher/class`);
  return response.data;
};

export const fetchParentChildClasses = async (): Promise<IStudentClass[]> => {
  const res = await api.get(`${BASE_URL}/parent/child/classes`);
  return res.data;
};

export const fetchAssignmentsByClass = async (classUuid: string): Promise<IClass> => {
  const response = await api.get(`/student/assignment/${classUuid}`);
  return response.data;
};

export const fetchSubmissionsByCourse = async (courseUuid: string): Promise<ISubmission[]> => {
  const res = await api.get(`${BASE_URL}/teacher/class/${courseUuid}/submissions`);
  return res.data;
};

export const fetchChildrenByClass = async (classId: string): Promise<IUser[]> => {
  const res = await api.get(`${BASE_URL}/parent/child/class/${classId}`);
  return res.data;
};

export const fetchChildAssignmentsByClass = async (
  courseUuid: string,
  childId: string,
): Promise<IClass> => {
  const res = await api.get(`/parent/class/${courseUuid}/assignments/${childId}`);
  return res.data;
};

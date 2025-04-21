import { Platform } from 'react-native';

export const BASE_URL = Platform.OS === 'ios' ? 'http://127.0.0.1:8000' : 'http://10.0.2.2:8000';

export enum UserRoles {
  ADMIN = 'admin',
  STUDENT = 'student',
  PARENT = 'parent',
  TEACHER = 'teacher',
  USER = 'user',
}

export enum AssignmentStatus {
  ACTIVE = 'active',
  SUBMITTED = 'submitted',
  SUBMITTED_LATE = 'submitted-late',
}

interface IAssignmentResult {
  title: string;
  dueDate: string;
  status: 'Graded' | 'Ungraded';
  grade: string;
}

export interface IChatMessage {
  uuid: string;
  content: string;
  senderId: string;
  receiverId: string;
  sender: IUser;
  chatId: string;
  createdAt: string;
}

export interface IChatPreview {
  chatId: string;
  currentUser: {
    uuid: string;
    firstName: string;
    lastName: string;
  };
  withUser: {
    uuid: string;
    firstName: string;
    lastName: string;
  };
  lastMessage: {
    content: string;
    createdAt: string;
  } | null;
}

export interface IUser extends IBaseEntity {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  role: UserRoles;
}

export interface IStudent extends IBaseEntity {
  user: IUser;
  grade?: string;
  school?: string;
  parent?: IParent;
  isActive: boolean;
  friends: IStudent[];
  submissions: ISubmission[];
}

export interface IParent extends IBaseEntity {}

export interface ISubmission extends IBaseEntity {
  content: string;
  grade: string;
  assignment: IAssignment;
  status: AssignmentStatus;
  submittedAt: Date;
  student: IStudent;
}

export interface IAssignment extends IBaseEntity {
  title: string;
  description: string;
  dueDate: Date;
  class: IClass;
  submissions: ISubmission[];
}

export interface IClass extends IBaseEntity {
  name: string;
  courseCode: string;
  courseType: string;
  term: string;
  teacher: string;
  studentClasses: IStudentClass[];
  assignments: IAssignment[];
}

export interface IStudentClass extends IBaseEntity {
  student: IStudent;
  class: IClass;
  status: string;
  enrolledAt: Date;
}

export interface IBaseEntity {
  uuid: string;
  createdAt: Date;
  updatedAt: Date;
}

export const RoleDisplayMapping = new Map<UserRoles, string>([
  [UserRoles.ADMIN, 'ADMIN'],
  [UserRoles.USER, 'USER'],
  [UserRoles.PARENT, 'PARENT'],
  [UserRoles.TEACHER, 'LECTURER'],
  [UserRoles.STUDENT, 'STUDENT'],
]);

export enum OnlineStatus {
  ONLINE = 'online',
  OFFLINE = 'offline',
  IDLE = 'idle',
}

export const OnlineStatusMapping = new Map<OnlineStatus, string>([
  [OnlineStatus.ONLINE, 'Online'],
  [OnlineStatus.OFFLINE, 'Offline'],
]);

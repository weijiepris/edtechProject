export const USER_ROLES = {
  ADMIN: 'admin',
  STUDENT: 'student',
  PARENT: 'parent',
  TEACHER: 'teacher',
  USER: 'user'
};

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

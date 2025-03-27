import { Platform } from "react-native";

export const BASE_URL =
  Platform.OS === "ios" ? "http://127.0.0.1:8000" : "http://10.0.2.2:8000";

export enum UserRoles {
  ADMIN = "admin",
  STUDENT = "student",
  PARENT = "parent",
  TEACHER = "teacher",
  USER = "user",
}

export interface IUser extends IBaseEntity {
  uuid: number;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  role: UserRoles;
}

export interface IBaseEntity {
  createdAt: Date;
  updatedAt: Date;
}

export const RoleDisplayMapping = new Map<UserRoles, string>([
  [UserRoles.ADMIN, "ADMIN"],
  [UserRoles.USER, "USER"],
  [UserRoles.PARENT, "PARENT"],
  [UserRoles.TEACHER, "TEACHER"],
  [UserRoles.STUDENT, "STUDENT"],
]);

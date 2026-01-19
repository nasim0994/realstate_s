import type { IRole } from "./roleInterface";

export interface IUser {
  _id: string;
  email: string;
  name: string;
  designation: string;
  password: string;
  needsPasswordChange: boolean;
  role: string;
  rolePermission?: IRole[];
  isDeleted: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedBy?: IUser;
}

export interface IUserProps {
  targetedUser: IUser;
}

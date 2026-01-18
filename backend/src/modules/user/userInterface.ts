import { Types } from 'mongoose';
import { IRole } from '../role/roleInterface';

export type IUser = {
  email: string;
  name: string;
  designation: string;
  password: string;
  needsPasswordChange: boolean;
  role: string;
  rolePermission?: Types.ObjectId;
  profileUrl?: string;
  isDeleted: boolean;
  status: 'active' | 'blocked';
  deletedBy?: Types.ObjectId;
};

export type IPopulateUser = {
  email: string;
  name: string;
  designation: string;
  password: string;
  needsPasswordChange: boolean;
  role: string;
  rolePermission?: IRole;
  isDeleted: boolean;
  status: 'active' | 'blocked';
};

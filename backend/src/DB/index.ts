/* eslint-disable no-console */
import { IUser } from '../modules/user/userInterface';
import { User } from '../modules/user/userModel';

const defaultAdmin: IUser = {
  email: 'sa@mail.com',
  name: 'Super Admin',
  designation: 'Super Admin',
  password: 'sa@mail.com',
  needsPasswordChange: false,
  role: 'superAdmin',
  isDeleted: false,
  status: 'active',
};

export const seedDefaultAdmin = async () => {
  const isSuperAdminExits = await User.findOne({ role: 'superAdmin' });

  if (!isSuperAdminExits) {
    const result = await User.create(defaultAdmin);
    if (result) {
      console.log('Default superAdmin created successfully');
    }
  }
};

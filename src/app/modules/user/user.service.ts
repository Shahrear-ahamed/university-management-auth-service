import { IUser } from './user.interface';
import { User } from './user.model';
import { generateUserId } from './user.utils';
import config from '../../../config';

const createUser = async (user: IUser): Promise<IUser | null> => {
  // create auto generated incremental unique id
  user.id = await generateUserId();

  // default password
  if (!user.password) {
    user.password = config.default_user_pass as string;
  }

  const createdUser = await User.create(user);

  if (!createdUser) throw new Error('Failed to create user!');

  return createdUser;
};

export const UserService = { createUser };
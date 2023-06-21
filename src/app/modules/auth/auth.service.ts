import { ILoginUser, ILoginUserResponse } from './auth.interface';
import { User } from '../user/user.model';
import ApiError from '../../../Errors/ApiError';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelper } from '../../../helpers/jwtHelper';

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { id, password } = payload;

  //create instance and check is exist user
  const user = new User();
  const isExist = await user.isUserExist(id);

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not found', '');
  }

  // match password
  if (
    isExist.password &&
    !(await user.isPasswordMatched(password, isExist?.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect', '');
  }

  // create refresh anc access token
  const { id: userId, role, needPasswordChange } = isExist;
  const accessToken = jwtHelper.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelper.createToken(
    { userId, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
    needPasswordChange,
  };
};

export const AuthService = { loginUser };

import {
  IChangePassword,
  ILoginUser,
  ILoginUserResponse,
  IRefreshToken,
} from './auth.interface';
import { User } from '../user/user.model';
import ApiError from '../../../Errors/ApiError';
import httpStatus from 'http-status';
import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelper } from '../../../helpers/jwtHelper';
import bcrypt from 'bcrypt';

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

const refreshToken = async (token: string): Promise<IRefreshToken> => {
  // verify token
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelper.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token', '');
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { userId } = verifiedToken;

  // check token holder are available in a database or not

  const user = new User();
  const isExist = user.isUserExist(userId);

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not found', '');
  }

  // generate new token
  const newAccessToken = jwtHelper.createToken(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    { userId: isExist?.id, role: isExist?.role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

const changePassword = async (
  user: JwtPayload | null,
  payload: IChangePassword
): Promise<void> => {
  const { oldPassword, newPassword } = payload;

  // check user exist
  const userInstance = new User();
  const isUserExist = await userInstance.isUserExist(user?.userId);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not found', '');
  }

  // match old password for check
  if (
    isUserExist.password &&
    !(await userInstance.isPasswordMatched(oldPassword, isUserExist?.password))
  ) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'Old password is incorrect',
      ''
    );
  }

  // hash password before saving
  const hashedPassword = await bcrypt.hash(
    newPassword,
    Number(config.bcrypt_salt_round)
  );

  const updatedData = {
    password: hashedPassword,
    needPasswordChange: false,
    passwordChangedAt: new Date(),
  };

  await User.findOneAndUpdate({ id: user?.userId }, updatedData);
};

export const AuthService = { loginUser, refreshToken, changePassword };

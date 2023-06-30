import { NextFunction, Request, Response } from 'express';
import ApiError from '../../Errors/ApiError';
import httpStatus from 'http-status';
import { jwtHelper } from '../../helpers/jwtHelper';
import config from '../../config';
import { Secret } from 'jsonwebtoken';

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // get authorization token
      const authToken = req.headers?.authorization?.split(' ')[1];

      if (!authToken) {
        throw new ApiError(
          httpStatus.UNAUTHORIZED,
          'You are not authorized',
          ''
        );
      }

      // verify token
      let verifiedUser = null;
      verifiedUser = await jwtHelper.verifyToken(
        authToken,
        config.jwt.secret as Secret
      );

      req.user = verifiedUser;

      // role-based auth
      if (requiredRoles.length && !requiredRoles.includes(verifiedUser?.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden', '');
      }
      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;

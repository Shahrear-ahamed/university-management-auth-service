import { NextFunction, Request, Response } from 'express';
import { UserService } from './user.service';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body;

    const result = await UserService.createUser(user);

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      status: true,
      message: 'User created successfully',
      data: result,
    });

    next();
  }
);

export const UserController = { createUser };

import { RequestHandler } from 'express';
import { UserService } from './user.service';
import httpStatus from 'http-status';

const createUser: RequestHandler = async (req, res, next) => {
  try {
    const { user } = req.body;

    const result = await UserService.createUser(user);

    res.status(httpStatus.CREATED).json({
      success: true,
      message: 'User created successfully',
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export const UserController = { createUser };

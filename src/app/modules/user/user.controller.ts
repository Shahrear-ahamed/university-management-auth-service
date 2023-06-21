import { Request, Response } from 'express';
import { UserService } from './user.service';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';

const createStudent = catchAsync(async (req: Request, res: Response) => {
  const { student, ...userData } = req.body;

  const result = await UserService.createStudent(student, userData);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    status: true,
    message: 'Student created successfully',
    data: result,
  });
});

// create faculty
const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { faculty, ...userData } = req.body;

  const result = await UserService.createFaculty(faculty, userData);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    status: true,
    message: 'Faculty created successfully',
    data: result,
  });
});

// create admin
const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const { admin, ...userData } = req.body;

  const result = await UserService.createStudent(admin, userData);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    status: true,
    message: 'Admin created successfully',
    data: result,
  });
});

export const UserController = { createStudent, createFaculty, createAdmin };

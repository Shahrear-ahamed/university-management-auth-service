import catchAsync from '../../../shared/catchAsync';
import { Request, Response } from 'express';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { StudentService } from './student.service';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { IStudent } from './student.interface';
import { studentFilterableFields } from './student.constant';

// get all students
const getAllStudents = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, studentFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  // DB Operation
  const result = await StudentService.getAllStudents(
    filters,
    paginationOptions
  );

  // send response
  sendResponse<IStudent[]>(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: 'Students retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

// get a single student
const getSingleStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await StudentService.getSingleStudent(id);

  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: 'Student retrieved successfully',
    data: result,
  });
});

// update a single student
const updateStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const { ...studentData } = req.body;

  const result = await StudentService.updateStudent(id, studentData);

  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: 'Student updated successfully',
    data: result,
  });
});

// delete student
const deleteStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await StudentService.deleteStudent(id);

  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: 'Student delete successfully',
    data: result,
  });
});

export const StudentController = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};

/* eslint-disable no-unused-vars */
import { Request, Response } from 'express';
import { AcademicSemesterService } from './academicSemester.service';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { academicSemesterFilterableFields } from './academicSemester.constant';
import { IAcademicSemester } from './academicSemester.interface';

const createSemester = catchAsync(async (req: Request, res: Response) => {
  const { ...academicSemesterData } = req.body;

  // DB Operation
  const result = await AcademicSemesterService.createSemester(
    academicSemesterData
  );

  // send response
  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.CREATED,
    status: true,
    message: 'Academic Semester created successfully',
    data: result,
  });

  // next();
});

const getAllSemester = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicSemesterFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  // DB Operation
  const result = await AcademicSemesterService.getAllSemesters(
    filters,
    paginationOptions
  );

  // send response
  sendResponse<IAcademicSemester[]>(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: 'Semesters retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await AcademicSemesterService.getSingleSemester(id);

  // send response
  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: 'Semesters retrieved successfully',
    data: result,
  });
});

// update single semester
const updateSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updateData = req.body;

  const result = await AcademicSemesterService.updateSemester(id, updateData);

  // send response
  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: 'Semesters retrieved successfully',
    data: result,
  });
});

// delete semester
const deleteSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await AcademicSemesterService.deleteSemester(id);

  // send response
  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: 'Semesters deleted successfully',
    data: result,
  });
});

export const AcademicSemesterController = {
  createSemester,
  getAllSemester,
  getSingleSemester,
  updateSemester,
  deleteSemester,
};

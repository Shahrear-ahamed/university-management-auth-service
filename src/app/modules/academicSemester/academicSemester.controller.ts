/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { AcademicSemesterService } from './academicSemester.service';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { academicSemesterFilterableFields } from './academicSemester.constant';
import { IAcademicSemester } from './academicSemester.interface';

const createSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
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
  }
);

const getAllSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
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

    // next();
  }
);

const getSingleSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const result = await AcademicSemesterService.getSingleSemester(id);

    // send response
    sendResponse<IAcademicSemester>(res, {
      statusCode: httpStatus.OK,
      status: true,
      message: 'Semesters retrieved successfully',
      data: result,
    });
  }
);

export const AcademicSemesterController = {
  createSemester,
  getAllSemester,
  getSingleSemester,
};

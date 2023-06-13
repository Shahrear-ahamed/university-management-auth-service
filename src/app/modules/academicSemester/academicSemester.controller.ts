import { NextFunction, Request, Response } from 'express';
import { AcademicSemesterService } from './academicSemester.service';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';

const createSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body;

    const result = await AcademicSemesterService.createSemester(
      academicSemesterData
    );

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      status: true,
      message: 'Academic Semester created successfully',
      data: result,
    });

    next();
  }
);

const getAllSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const paginationOptions = pick(req.query, paginationFields);

    const result = await AcademicSemesterService.getAllSemesters(
      paginationOptions
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      status: true,
      message: 'Semesters retrieved successfully',
      meta: result.meta,
      data: result.data,
    });

    next();
  }
);

export const AcademicSemesterController = { createSemester, getAllSemester };

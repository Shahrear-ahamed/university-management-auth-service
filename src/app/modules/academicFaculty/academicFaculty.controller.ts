import catchAsync from '../../../shared/catchAsync';
import { Request, Response } from 'express';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IAcademicFaculty } from './academicFaculty.interface';
import { AcademicFacultyService } from './academicFaculty.service';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { academicFacultyFilterableFields } from './academicFaculty.constant';

// create a single faculty
const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { ...facultyData } = req.body;

  const result = await AcademicFacultyService.createFaculty(facultyData);

  // send response
  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.CREATED,
    status: true,
    message: 'Faculty created successfully',
    data: result,
  });
});

// get all faculties
const getAllFaculties = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicFacultyFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  // db queries
  const result = await AcademicFacultyService.getAllFaculties(
    filters,
    paginationOptions
  );
  // send response
  sendResponse<IAcademicFaculty[]>(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: 'All faculties retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

// get single faculty
const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await AcademicFacultyService.getSingleSemester(id);

  // send response
  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: 'Single semester retrieved successfully',
    data: result,
  });
});

// update a faculty
const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await AcademicFacultyService.updateFaculty(id, updatedData);

  // send response
  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: 'Faculty Updated successfully',
    data: result,
  });
});

// delete a faculty
const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await AcademicFacultyService.deleteFaculty(id);

  // send response
  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: 'Faculty deleted successfully',
    data: result,
  });
});

// export all controllers
export const AcademicFacultyController = {
  createFaculty,
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};

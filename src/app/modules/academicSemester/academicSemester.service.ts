import { IAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.mode';
import { academicSemesterTitleCodeMapper } from './academicSemester.constant';
import ApiError from '../../../Errors/ApiError';
import httpStatus from 'http-status';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { SortOrder } from 'mongoose'; // create a new data

// create a new data
const createSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semester code', '');
  }
  return await AcademicSemester.create(payload);
};

// get all semester
const getAllSemesters = async (
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  // retrieved data from model
  const result = await AcademicSemester.find()
    .sort(sortConditions)
    .limit(limit)
    .skip(skip);

  // total documents
  const total = await AcademicSemester.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
export const AcademicSemesterService = { createSemester, getAllSemesters };

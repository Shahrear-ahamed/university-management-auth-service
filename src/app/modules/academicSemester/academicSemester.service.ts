import {
  IAcademicSearchFilters,
  IAcademicSemester,
} from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.mode';
import {
  academicSemesterSearchableFields,
  academicSemesterTitleCodeMapper,
} from './academicSemester.constant';
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
  filters: IAcademicSearchFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  // searchable are here
  const { searchTerm, ...filtersData } = filters;

  const andCondition = [];

  // search items with dynamic partial match
  if (searchTerm) {
    andCondition.push({
      $or: academicSemesterSearchableFields.map(fields => ({
        [fields]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  // search items with dynamic exact match
  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // pagination is here
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  // where condition
  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};

  // retrieved data from model
  const result = await AcademicSemester.find(whereCondition)
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

// get single semester
const getSingleSemester = async (
  id: string
): Promise<IAcademicSemester | null> => {
  return AcademicSemester.findById(id);
};
export const AcademicSemesterService = {
  createSemester,
  getAllSemesters,
  getSingleSemester,
};

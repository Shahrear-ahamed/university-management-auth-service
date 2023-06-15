import {
  IAcademicFaculty,
  IAcademicFacultyFilters,
} from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { academicFacultySearchableFields } from './academicFaculty.constant';
import { SortOrder } from 'mongoose';

const createFaculty = (
  payload: IAcademicFaculty
): Promise<IAcademicFaculty | null> => {
  return AcademicFaculty.create(payload);
};

// get all-faculties service
const getAllFaculties = async (
  filters: IAcademicFacultyFilters,
  paginationOptions: IPaginationOptions
) => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: academicFacultySearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  // total number of data
  const total = await AcademicFaculty.countDocuments();

  // result
  const result = await AcademicFaculty.find(whereConditions)
    .sort(sortBy)
    .skip(skip)
    .limit(limit);

  // return data
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// get single faculty service
const getSingleSemester = (id: string): Promise<IAcademicFaculty | null> => {
  return AcademicFaculty.findById(id);
};

// update a faculty service
const updateFaculty = (
  id: string,
  payload: IAcademicFaculty
): Promise<IAcademicFaculty | null> => {
  return AcademicFaculty.findOneAndUpdate({ _id: id }, payload, { new: true });
};

// delete a faculty service
const deleteFaculty = (id: string): Promise<IAcademicFaculty | null> => {
  return AcademicFaculty.findByIdAndDelete(id);
};

export const AcademicFacultyService = {
  createFaculty,
  getAllFaculties,
  getSingleSemester,
  updateFaculty,
  deleteFaculty,
};

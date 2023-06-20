import { SortOrder } from 'mongoose';
import { IStudent, IStudentFilters } from './student.interface';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { studentSearchableFields } from './student.constant';
import { Student } from './student.model';

const getAllStudents = async (
  filters: IStudentFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IStudent[]>> => {
  // searchable are here
  const { searchTerm, ...filtersData } = filters;

  const andCondition = [];

  // search items with dynamic partial match
  if (searchTerm) {
    andCondition.push({
      $or: studentSearchableFields.map(fields => ({
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
  const result = await Student.find(whereCondition)
    .populate([
      {
        path: 'academicSemester',
        select: ['title', 'year', 'code', 'startMonth', 'endMonth'],
      },
      { path: 'academicDepartment', select: ['title', 'academicFaculty'] },
      { path: 'academicFaculty', select: ['title'] },
    ])
    .sort(sortConditions)
    .limit(limit)
    .skip(skip);

  // total documents
  const total = await Student.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleStudent = async (id: string): Promise<IStudent | null> => {
  return Student.findById(id).populate([
    {
      path: 'academicSemester',
      select: ['title', 'year', 'code', 'startMonth', 'endMonth'],
    },
    { path: 'academicDepartment', select: ['title', 'academicFaculty'] },
    { path: 'academicFaculty', select: ['title'] },
  ]);
};

const updateStudent = async (
  id: string,
  payload: Partial<IStudent>
): Promise<IStudent | null> => {
  return Student.findOneAndUpdate({ _id: id }, payload, { new: true });
};
const deleteStudent = (id: string): Promise<IStudent | null> => {
  return Student.findByIdAndDelete(id)
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty');
};

export const StudentService = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};

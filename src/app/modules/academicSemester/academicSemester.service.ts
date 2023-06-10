import { IAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.mode';
import { academicSemesterTitleCodeMapper } from './academicSemester.constant';
import ApiError from '../../../Errors/ApiError';
import httpStatus from 'http-status';

const createSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semester code', '');
  }
  return await AcademicSemester.create(payload);
};

export const AcademicSemesterService = { createSemester };

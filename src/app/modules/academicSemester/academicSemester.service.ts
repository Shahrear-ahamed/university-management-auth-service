import { IAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.mode';

const createSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  return await AcademicSemester.create(payload);
};

export const AcademicSemesterService = { createSemester };

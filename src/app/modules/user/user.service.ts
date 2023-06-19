import { IUser } from './user.interface';
import { User } from './user.model';
import config from '../../../config';
import { IStudent } from '../student/student.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { generateStudentId } from './user.utils';
import mongoose from 'mongoose';
import ApiError from '../../../Errors/ApiError';
import httpStatus from 'http-status';
import { Student } from '../student/student.model';

const createStudent = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  // default password
  if (!user.password) {
    user.password = config.default_student_pass as string;
  }

  // set role
  user.role = 'student';

  // find academic semester for incremental id
  const academicSemester = await AcademicSemester.findById(
    student.academicSemester
  );

  let newUserAllData = null;

  // create session
  const session = await mongoose.startSession();

  try {
    // start transaction
    session.startTransaction();

    // get id and set into user & student
    const id = await generateStudentId(academicSemester);
    user.id = id;
    student.id = id;

    // create a student if fail throw error
    const newStudent = await Student.create([student], { session });

    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Fail to create student', '');
    }

    // set student _id into user, create user and throw error
    user.student = newStudent[0]._id;
    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Fail to create student', '');
    }

    // save user data
    newUserAllData = newUser[0];

    // commit transaction and end transaction
    await session.commitTransaction();
    await session.endSession();

    // else catch error
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  // user --> student --> academicSemester, academicDepartment, academicFaculty for populate
  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'student',
      populate: [
        { path: 'academicSemester' },
        { path: 'academicDepartment' },
        { path: 'academicFaculty' },
      ],
    });
  }

  // send response
  return newUserAllData;
};

export const UserService = { createStudent };

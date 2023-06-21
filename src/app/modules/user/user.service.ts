import { IUser } from './user.interface';
import { User } from './user.model';
import config from '../../../config';
import { IStudent } from '../student/student.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './user.utils';
import mongoose from 'mongoose';
import ApiError from '../../../Errors/ApiError';
import httpStatus from 'http-status';
import { Student } from '../student/student.model';
import { IFaculty } from '../faculty/faculty.interface';
import { IAdmin } from '../admin/admin.interface';
import Faculty from '../faculty/faculty.model';
import Admin from '../admin/admin.model';

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

// faculty
const createFaculty = async (
  faculty: IFaculty,
  user: IUser
): Promise<IUser | null> => {
  // default password
  if (!user.password) {
    user.password = config.default_faculty_pass as string;
  }

  // set role
  user.role = 'faculty';

  let newUserAllData = null;

  // create session
  const session = await mongoose.startSession();

  try {
    // start transaction
    session.startTransaction();

    // get id and set into user & faculty
    const id = await generateFacultyId();
    user.id = id;
    faculty.id = id;

    // create a faculty if fail to throw error
    const newFaculty = await Faculty.create([faculty], { session });

    if (!newFaculty.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Fail to create faculty', '');
    }

    // set faculty _id into user, create user and throw error
    user.faculty = newFaculty[0]._id;
    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Fail to create faculty', '');
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

  // user --> faculty --> academicDepartment, academicFaculty for populate
  if (newUserAllData) {
    newUserAllData = await User.findOne({
      id: newUserAllData.id,
    }).populate({
      path: 'faculty',
      populate: [
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    });
  }

  // send response
  return newUserAllData;
};

// admin
const createAdmin = async (
  admin: IAdmin,
  user: IUser
): Promise<IUser | null> => {
  // default password
  if (!user.password) {
    user.password = config.default_admin_pass as string;
  }

  // set role
  user.role = 'admin';

  let newUserAllData = null;

  // create session
  const session = await mongoose.startSession();

  try {
    // start transaction
    session.startTransaction();

    // get id and set into user & admin
    const id = await generateAdminId();
    user.id = id;
    admin.id = id;

    // create an admin if fail to throw error
    const newAdmin = await Admin.create([admin], { session });

    if (!newAdmin.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Fail to create admin', '');
    }

    // set admin _id into user, create user and throw error
    user.admin = newAdmin[0]._id;
    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Fail to create admin', '');
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

  // user --> admin --> academicDepartment, academicFaculty for populate
  if (newUserAllData) {
    newUserAllData = await User.findOne({
      id: newUserAllData.id,
    }).populate({
      path: 'admin',
      populate: [
        {
          path: 'managementDepartment',
        },
      ],
    });
  }

  // send response
  return newUserAllData;
};

export const UserService = { createStudent, createFaculty, createAdmin };

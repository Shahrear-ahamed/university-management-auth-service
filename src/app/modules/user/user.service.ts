import { IUser } from './user.interface';
import { User } from './user.model';
import config from '../../../config';
import { IStudent } from '../student/student.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { generateStudentId } from './user.utils';

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

  // eslint-disable-next-line no-unused-vars
  const id = await generateStudentId(academicSemester);

  const createdUser = await User.create(user);

  if (!createdUser) throw new Error('Failed to create user!');

  return createdUser;
};

export const UserService = { createStudent };

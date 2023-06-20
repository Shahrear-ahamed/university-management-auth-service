import express from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { AcademicSemesterRouters } from '../modules/academicSemester/academicSemester.route';
import { AcademicFacultyRouters } from '../modules/academicFaculty/academicFaculty.route';
import { AcademicDepartmentRoutes } from '../modules/academicDepertment/academicDepertment.route';
import { StudentRoutes } from '../modules/student/student.route';

const router = express.Router();

const moduleRouters = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/academic-semester',
    route: AcademicSemesterRouters,
  },
  {
    path: '/academic-faculty',
    route: AcademicFacultyRouters,
  },
  {
    path: '/academic-department',
    route: AcademicDepartmentRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
];

moduleRouters.forEach(route => router.use(route.path, route.route));
export default router;

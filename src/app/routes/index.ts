import express from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { AcademicSemesterRouter } from '../modules/academicSemester/academicSemester.route';

const router = express.Router();

const moduleRouters = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/academic-semester',
    route: AcademicSemesterRouter,
  },
];

moduleRouters.forEach(route => router.use(route.path, route.route));
export default router;

import express from 'express';
import { AcademicDepartmentController } from './academicDepertment.controller';

const router = express.Router();

router.get('/:id', AcademicDepartmentController.getSingleDepartment);

router.patch('/:id', AcademicDepartmentController.updateDepartment);

router.delete('/:id', AcademicDepartmentController.deleteDepartment);

router.get('/', AcademicDepartmentController.getAllDepartments);

export const AcademicDepartmentRoutes = router;

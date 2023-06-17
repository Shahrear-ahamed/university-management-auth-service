import express from 'express';
import { AcademicDepartmentController } from './academicDepertment.controller';
import { AcademicDepartmentValidation } from './academicDepertment.validation';
import ValidationRequest from '../../middlewares/validationRequest';

const router = express.Router();

router.post(
  '/create-department',
  ValidationRequest(
    AcademicDepartmentValidation.createAcademicDepartmentZodSchema
  ),
  AcademicDepartmentController.createDepartment
);

router.get('/:id', AcademicDepartmentController.getSingleDepartment);

router.patch(
  '/:id',
  ValidationRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentZodSchema
  ),
  AcademicDepartmentController.updateDepartment
);

router.delete('/:id', AcademicDepartmentController.deleteDepartment);

router.get('/', AcademicDepartmentController.getAllDepartments);

export const academicDepartmentRoutes = router;

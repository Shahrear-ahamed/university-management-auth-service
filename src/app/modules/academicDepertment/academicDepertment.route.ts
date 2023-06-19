import express from 'express';
import validationRequest from '../../middlewares/validationRequest';
import { AcademicDepartmentController } from './academicDepertment.controller';
import { AcademicDepartmentValidation } from './academicDepertment.validation';

const router = express.Router();

router.post(
  '/',
  validationRequest(
    AcademicDepartmentValidation.createAcademicDepartmentZodSchema
  ),
  AcademicDepartmentController.createDepartment
);

router.get('/:id', AcademicDepartmentController.getSingleDepartment);

router.patch(
  '/:id',
  validationRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentZodSchema
  ),
  AcademicDepartmentController.updateDepartment
);

router.delete('/:id', AcademicDepartmentController.deleteDepartment);

router.get('/', AcademicDepartmentController.getAllDepartments);

export const AcademicDepartmentRoutes = router;

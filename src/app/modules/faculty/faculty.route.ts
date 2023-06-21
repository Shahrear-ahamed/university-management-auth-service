import express from 'express';
import validationRequest from '../../middlewares/validationRequest';
import { FacultyValidation } from './faculty.validation';
import { FacultyController } from './faculty.controller';

const router = express.Router();

router.get('/:id', FacultyController.getSingleFaculty);
router.get('/', FacultyController.getAllFaculties);

router.patch(
  '/:id',
  validationRequest(FacultyValidation.updateFacultyZodSchema),
  FacultyController.updateFaculty
);

router.delete('/:id', FacultyController.deleteFaculty);

export const FacultyRoutes = router;
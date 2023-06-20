import express from 'express';
import { StudentController } from './student.controller';
import { StudentValidation } from './student.validation';
import validationRequest from '../../middlewares/validationRequest';

const router = express.Router();

router.get('/:id', StudentController.getSingleStudent);
// router.delete('/:id', StudentController.deleteStudent);

router.patch(
  '/:id',
  validationRequest(StudentValidation.updateStudentZodSchema),
  StudentController.updateStudent
);

router.get('/', StudentController.getAllStudents);

export const StudentRoutes = router;

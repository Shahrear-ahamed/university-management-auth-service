import express from 'express';
import validationRequest from '../../middlewares/validationRequest';
import { StudentController } from './student.controller';
import { UserValidation } from '../user/user.validation';

const router = express.Router();

router.get('/:id', StudentController.getSingleStudent);
// router.delete('/:id', StudentController.deleteStudent);

router.patch(
  '/:id',
  validationRequest(UserValidation.createUserZodSchema),
  StudentController.updateStudent
);

router.get('/', StudentController.getAllStudents);

export const StudentRoutes = router;

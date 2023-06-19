import express from 'express';
import { UserController } from './user.controller';
import validationRequest from '../../middlewares/validationRequest';
import { UserValidation } from './user.validation';

const router = express.Router();

router.post(
  '/create-student',
  validationRequest(UserValidation.createUserZodSchema),
  UserController.createStudent
);

export const UserRoutes = router;

import express from 'express';
import { UserController } from './user.controller';
import validationRequest from '../../middlewares/validationRequest';
import { UserValidation } from './user.validation';

const router = express.Router();

router.post(
  '/create-user',
  validationRequest(UserValidation.createUserZodSchema),
  UserController.createUser
);

export const UserRoutes = router;

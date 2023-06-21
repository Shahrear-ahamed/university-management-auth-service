import express from 'express';
import validationRequest from '../../middlewares/validationRequest';
import { AuthValidation } from './auth.validation';
import { AuthController } from './auth.controller';

const router = express.Router();

router.post(
  '/login',
  validationRequest(AuthValidation.loginZodSchema),
  AuthController.loginUser
);

router.post(
  '/refresh-token',
  validationRequest(AuthValidation.refreshTokenZodSchema),
  AuthController.refreshToken
);

export const AuthRoutes = router;

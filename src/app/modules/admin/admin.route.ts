import express from 'express';
import { AdminController } from './admin.controller';
import { AdminValidation } from './admin.validation';
import validationRequest from '../../middlewares/validationRequest';

const router = express.Router();

router.get('/:id', AdminController.getSingleAdmin);
router.get('/', AdminController.getAllAdmins);

router.delete('/:id', AdminController.deleteAdmin);

router.patch(
  '/:id',
  validationRequest(AdminValidation.updateAdminZodSchema),
  AdminController.updateAdmin
);

export const AdminRoutes = router;

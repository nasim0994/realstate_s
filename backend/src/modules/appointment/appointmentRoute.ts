import express from 'express';
const Router = express.Router();
import verifyValidate from '../../middlewares/verifyValidate';
import { verifyPermission } from '../../middlewares/verifyPermission';
import {
  addAppointmentController,
  deleteAppointmentController,
  getAllAppointmentController,
  getAppointmentCountsController,
  getSingleAppointmentController,
  updateAppointmentController,
} from './appointmentController';
import {
  appointmentValidation,
  updateAppointmentValidation,
} from './appointmentValidation';

Router.post(
  '/add',
  verifyValidate(appointmentValidation),
  addAppointmentController,
);
Router.get(
  '/all',
  verifyPermission('appointment', 'read'),
  getAllAppointmentController,
);
Router.get('/counts', getAppointmentCountsController);
Router.get(
  '/:id',
  verifyPermission('appointment', 'read'),
  getSingleAppointmentController,
);
Router.patch(
  '/update/:id',
  verifyPermission('appointment', 'update'),
  verifyValidate(updateAppointmentValidation),
  updateAppointmentController,
);
Router.delete(
  '/delete/:id',
  verifyPermission('appointment', 'delete'),
  deleteAppointmentController,
);

export const appointmentRoute = Router;

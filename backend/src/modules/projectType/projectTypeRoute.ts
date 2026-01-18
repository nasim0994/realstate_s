import express from 'express';
const Router = express.Router();
import verifyValidate from '../../middlewares/verifyValidate';
import { verifyPermission } from '../../middlewares/verifyPermission';
import {
  addProjectTypeController,
  deleteProjectTypeController,
  getAllProjectTypeController,
  getSingleProjectTypeController,
  updateProjectTypeController,
} from './projectTypeController';
import { projectTypeValidation } from './projectTypeValidation';

Router.post(
  '/add',
  verifyValidate(projectTypeValidation),
  addProjectTypeController,
);
Router.get('/all', getAllProjectTypeController);
Router.get('/:id', getSingleProjectTypeController);
Router.patch(
  '/update/:id',
  verifyPermission('project-type', 'update'),
  verifyValidate(projectTypeValidation),
  updateProjectTypeController,
);
Router.delete(
  '/delete/:id',
  verifyPermission('project-type', 'delete'),
  deleteProjectTypeController,
);

export const projectTypesRoute = Router;

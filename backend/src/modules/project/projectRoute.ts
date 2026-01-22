import express, { NextFunction, Request, Response } from 'express';
import {
  createProjectController,
  deleteProjectController,
  getAllProjectController,
  getByIdProjectController,
  getBySlugProjectController,
  getProjectCountController,
  toggleProjectHighlightController,
  updateProjectActiveController,
  updateProjectController,
  updateProjectFeatureController,
} from './projectController';
import { verifyPermission } from '../../middlewares/verifyPermission';
const Router = express.Router();

import { fileUploader } from '../../utils/fileUploader';
const { upload, uploadAndConvert } = fileUploader('project');

const uploader = upload.fields([
  { name: 'thumbnail', maxCount: 1 },
  { name: 'gallery' },
]);

Router.post(
  '/add',
  verifyPermission('project', 'create'),
  uploader,
  uploadAndConvert,
  (req: Request, res: Response, next: NextFunction) => {
    req.body = req.body.data && JSON.parse(req.body.data);
    next();
  },
  createProjectController,
);
Router.get('/all', getAllProjectController);
Router.get('/count', getProjectCountController);
Router.get('/:id', getByIdProjectController);
Router.get('/slug/:slug', getBySlugProjectController);
Router.patch(
  '/update/:id',
  verifyPermission('project', 'update'),
  uploader,
  uploadAndConvert,
  (req: Request, res: Response, next: NextFunction) => {
    req.body = req.body.data && JSON.parse(req.body.data);
    next();
  },
  updateProjectController,
);

Router.patch('/toggle-feature/:id', updateProjectFeatureController);
Router.patch('/toggle-active/:id', updateProjectActiveController);
Router.patch('/toggle-highlight/:id', toggleProjectHighlightController);
Router.delete(
  '/delete/:id',
  verifyPermission('project', 'delete'),
  deleteProjectController,
);

export const projectRoute = Router;

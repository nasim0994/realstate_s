import express, { NextFunction, Request, Response } from 'express';
const Router = express.Router();
import { verifyPermission } from '../../middlewares/verifyPermission';
import {
  addBlogController,
  deleteBlogController,
  getAllBlogController,
  getBlogBySlugController,
  getSingleBlogController,
  toggleBlogStatusController,
  updateBlogController,
} from './blogController';
import { fileUploader } from '../../utils/fileUploader';
const upload = fileUploader('blog').single('image');

Router.post(
  '/add',
  verifyPermission('blogs', 'create'),
  upload,
  (req: Request, res: Response, next: NextFunction) => {
    req.body = req.body.data && JSON.parse(req.body.data);
    next();
  },
  addBlogController,
);
Router.get('/all', getAllBlogController);
Router.get('/:id', getSingleBlogController);
Router.get('/slug/:slug', getBlogBySlugController);
Router.patch(
  '/update/:id',
  verifyPermission('blogs', 'update'),
  upload,
  (req: Request, res: Response, next: NextFunction) => {
    req.body = req.body.data && JSON.parse(req.body.data);
    next();
  },
  updateBlogController,
);
Router.delete(
  '/delete/:id',
  verifyPermission('blogs', 'delete'),
  deleteBlogController,
);
Router.patch(
  '/toggle/:id',
  verifyPermission('blogs', 'update'),
  toggleBlogStatusController,
);

export const blogRoute = Router;

import express from 'express';

import UserController from '../../controllers/user';
import { authMiddleware } from '../../middlewares/auth';
import cookieParser from 'cookie-parser';

const router = express.Router();

export const UserRouter = () => {
  router.use('/', cookieParser());
  router.use('/', express.json());
  router.use('/', express.urlencoded({ extended: true }));
  router.get('/', authMiddleware, UserController.getUser);

  return router;
};

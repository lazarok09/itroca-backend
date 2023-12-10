import express from 'express';

import UserController from '../../controllers/user';
import { authMiddleware } from '../../middlewares/auth';

const router = express.Router();

export const UsersRouter = () => {
  router.use('/', express.json());
  router.use('/', express.urlencoded({ extended: true }));
  router.get('/', UserController.getUsers);

  return router;
};

export const UserRouter = () => {
  router.get('/:id', authMiddleware, UserController.getUser);
  router.use('/:id', express.json());
  return router;
};

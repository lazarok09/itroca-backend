import express, { Response } from 'express';

import AuthController from '../../controllers/auth';
import { authMiddleware } from '../../middlewares/auth';
import cookieParser from 'cookie-parser';

export const AuthRouter = () => {
  const router = express.Router();
  // Auth
  router.use('/', express.json());
  router.use('/', express.urlencoded({ extended: true }));

  router.post('/signin', AuthController.signIn);

  router.post('/signout', cookieParser(), authMiddleware, AuthController.signOff);

  router.use('/signup', express.json());
  router.use('/signup', express.urlencoded({ extended: true }));
  router.post('/signup', AuthController.signUp);
  return router;
};

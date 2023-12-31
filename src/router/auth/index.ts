import express, { Response } from 'express';

import AuthController from '../../controllers/auth';
import cors from 'cors';

const corsOptions = {
  origin: process.env.PUBLIC_WEB_URL,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

export const AuthRouter = () => {
  const router = express.Router();
  // Auth
  router.use('/', express.json());
  router.use('/', express.urlencoded({ extended: true }));

  router.use('/signin', cors(corsOptions));
  router.post('/signin', AuthController.signIn);
  router.post('/signout', AuthController.signOff);

  router.use('/signup', express.json());
  router.use('/signup', express.urlencoded({ extended: true }));
  router.post('/signup', AuthController.signUp);
  return router;
};

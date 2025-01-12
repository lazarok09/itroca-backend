import express from 'express';
import cookieParser from 'cookie-parser';
import UserProductController from '../../controllers/user-product';

import { authMiddleware } from '../../middlewares/auth';

const router = express.Router();

export const UserProductsRouter = () => {
  router.get(
    '/',
    cookieParser(),
    authMiddleware,
    UserProductController.getProducts,
  );
  router.delete(
    '/',
    cookieParser(),
    authMiddleware,
    UserProductController.deleteProducts,
  );
  return router;
};

export const UserProductRouter = () => {
  router.get(
    '/:id',
    cookieParser(),
    authMiddleware,
    UserProductController.getProduct,
  );

  router.delete(
    '/:id',
    cookieParser(),
    authMiddleware,
    UserProductController.getProduct,
  );

  router.post(
    '/',
    cookieParser(),
    express.json(),
    express.urlencoded({ extended: true }),
    authMiddleware,
    UserProductController.createProduct,
  );

  router.patch(
    '/:id',
    cookieParser(),
    express.json(),
    express.urlencoded({ extended: true }),
    authMiddleware,
    UserProductController.updateProduct,
  );
  return router;
};

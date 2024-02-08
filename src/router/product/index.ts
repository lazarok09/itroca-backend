import express from 'express';
import cookieParser from 'cookie-parser';
import ProductController from '../../controllers/product';

import { authMiddleware } from '../../middlewares/auth';

const router = express.Router();

export const ProductsRouter = () => {
  router.get(
    '/',
    cookieParser(),
    authMiddleware,
    ProductController.getProducts,
  );
  router.delete(
    '/',
    cookieParser(),
    authMiddleware,
    ProductController.deleteProducts,
  );
  return router;
};

export const ProductRouter = () => {
  router.get('/:id', ProductController.getProduct);

  router.delete(
    '/:id',
    cookieParser(),
    authMiddleware,
    ProductController.getProduct,
  );

  router.post(
    '/',
    cookieParser(),
    express.json(),
    express.urlencoded({ extended: true }),
    authMiddleware,
    ProductController.createProduct,
  );

  router.patch(
    '/:id',
    cookieParser(),
    express.json(),
    express.urlencoded({ extended: true }),
    authMiddleware,
    ProductController.updateProduct,
  );
  return router;
};

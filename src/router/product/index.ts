import express, { Response } from 'express';
import cookieParser from 'cookie-parser';
import ProductController from '../../controllers/product';

import { authMiddleware } from '../../middlewares/auth';

const router = express.Router();

export const ProductsRouter = () => {
  router.get('/', ProductController.getProducts);
  router.delete('/', ProductController.deleteProducts);
  return router;
};

export const ProductRouter = () => {
  router.get('/:id', ProductController.getProduct);
  
  router.use('/', cookieParser());
  router.use('/', express.json());
  router.use('/', express.urlencoded({ extended: true }));
  router.post('/', authMiddleware, ProductController.createProduct);

  router.use('/:id', cookieParser());
  router.use('/:id', express.json());
  router.use('/:id', express.urlencoded({ extended: true }));
  router.patch('/:id', authMiddleware, ProductController.updateProduct);
  return router;
};

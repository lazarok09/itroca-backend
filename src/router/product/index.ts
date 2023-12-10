import express, { Response } from 'express';

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

  router.use('/', authMiddleware, express.json());
  router.use('/', authMiddleware, express.urlencoded({ extended: true }));
  router.post('/', authMiddleware, ProductController.createProduct);

  router.use('/:id', authMiddleware, express.json());
  router.use('/:id', authMiddleware, express.urlencoded({ extended: true }));
  router.patch('/:id', authMiddleware, ProductController.updateProduct);
  return router;
};

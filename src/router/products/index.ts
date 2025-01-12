import cookieParser from 'cookie-parser';
import express from 'express';
import ProductController from '../../controllers/products';

const router = express.Router();

export const ProductsRouter = () => {
  router.get('/', cookieParser(), ProductController.getProducts);
  return router;
};

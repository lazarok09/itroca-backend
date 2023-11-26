import ProductController from '../controllers/product';
import express from 'express';

const router = express.Router();

router.get('/products', ProductController.getProducts);
router.use('/product', express.json());
router.use('/product', express.urlencoded({ extended: true }));
router.post('/product', ProductController.createProduct);

router.get('/product/:id', ProductController.getProduct);

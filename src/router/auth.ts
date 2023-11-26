import { authController } from '../controllers/auth';
import express from 'express';

const router = express.Router();

router.use('/auth', express.json());
router.use('/auth', express.urlencoded({ extended: true }));
router.use('/auth', authController);

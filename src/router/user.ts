import express from 'express';
const router = express.Router();
import UserController from '../controllers/user';

router.get('/user/:id', UserController.getUser);
router.post('/user', UserController.createUser);

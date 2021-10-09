import { Router } from 'express';
import userController from '../controllers/userController';

const users = Router();

users.get('/', userController.getAllUsers);
users.get('/:id', userController.getUserById);
users.get('/by/username/:username', userController.getUserByUsername);

export default users;

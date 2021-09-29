import { Router } from 'express';
import userController from '../controllers/userController';

const users = Router();

users.get('/', userController.index);
users.get('/:user_id', userController.show);

export default users;

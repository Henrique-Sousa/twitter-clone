import { Router } from 'express';
import * as userController from '../controllers/userController';

const users = Router();

users.get('/', userController.index);

users.get('/:userId', userController.show);

export default users;

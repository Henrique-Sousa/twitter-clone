import { Router } from 'express';
import {
  getAllUsers,
  getUserById,
  getUserByUsername,
} from '../controllers/userController';

const users = Router();

users.get('/', getAllUsers);
users.get('/:id', getUserById);
users.get('/by/username/:username', getUserByUsername);

export default users;

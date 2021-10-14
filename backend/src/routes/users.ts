import { Router } from 'express';
import {
  getAllUsers, getUserById, getUserByUsername, createUser, logUserIn,
} from '../controllers/userController';

const users = Router();

users.get('/', getAllUsers);
users.get('/:id', getUserById);
users.get('/by/username/:username', getUserByUsername);
users.post('/', createUser);
users.post('/login', logUserIn);

export default users;

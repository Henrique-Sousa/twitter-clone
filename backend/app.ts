import 'reflect-metadata';
import express from 'express';
import usersRouter from './src/routes/users';
import './src/database';

const app = express();

app.use('/users', usersRouter);

app.listen(3000);

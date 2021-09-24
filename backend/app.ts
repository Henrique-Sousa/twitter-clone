import 'reflect-metadata';
import express from 'express';
import usersRouter from './src/routes/users';
import tweetsRouter from './src/routes/tweets';
import './src/database';

const app = express();

app.use('/users', usersRouter);
app.use('/tweets', tweetsRouter);

app.listen(3000);

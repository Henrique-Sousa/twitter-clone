import 'reflect-metadata';
import express from 'express';
import createError from 'http-errors';
import { createConnection } from 'typeorm';
import usersRouter from './routes/users';
import tweetsRouter from './routes/tweets';

type Request = express.Request;
type Response = express.Response;
type NextFunction = express.NextFunction;
type HttpError = createError.HttpError;

createConnection();

const app = express();

app.use(express.json());

app.all('*', (req: Request, res: Response, next: NextFunction): void => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use('/users', usersRouter);
app.use('/tweets', tweetsRouter);

app.use((req: Request, res: Response, next: NextFunction): void => {
  next(createError(404));
});

app.use((err: HttpError, req: Request, res: Response, next: NextFunction): void => {
  res.status(err.status || 500);
  res.end();
});

app.listen(3001);

import 'reflect-metadata';
import express from 'express';
import usersRouter from './src/routes/users';
import connection from './src/database';

const main = async () => {
  const app = express();
  app.locals.connection = await connection;
  app.use('/users', usersRouter);
  app.listen(3000);
};

main().catch((error) => console.error(error));

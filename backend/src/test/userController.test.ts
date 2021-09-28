import 'reflect-metadata';
import request from 'supertest';
import express from 'express';
import {
  createConnection,
  getConnection,
  getRepository,
} from 'typeorm';
import User from '../entity/User';
import usersRouter from '../routes/users';
import options from '../mock-database';

beforeEach(() => (
  createConnection(options)
));

afterEach(() => {
  const conn = getConnection();
  return conn.close();
});

const app = express();

app.use('/users', usersRouter);

test('users route', async () => {
  const userRepository = getRepository(User);
  await userRepository.insert({
    name: 'Barack Obama',
    username: 'BarackObama',
  });
  await userRepository.insert({
    name: 'Justin Bieber',
    username: 'justinbieber',
  });
  const result = await request(app)
    .get('/users')
    .expect('Content-Type', /json/)
    .expect(200);
  expect(result.body[0].id).toBe(1);
  expect(result.body[1].id).toBe(2);
  expect(result.body[0].name).toBe('Barack Obama');
  expect(result.body[1].name).toBe('Justin Bieber');
  expect(result.body[0].username).toBe('BarackObama');
  expect(result.body[1].username).toBe('justinbieber');
});

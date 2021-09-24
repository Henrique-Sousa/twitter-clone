import 'reflect-metadata';
import request from 'supertest';
import express from 'express';
import {
  ConnectionOptions,
  createConnection,
  getConnection,
  getRepository,
} from 'typeorm';
import User from '../entity/User';
import Tweet from '../entity/Tweet';
import users from '../routes/users';

beforeEach(() => {
  const options: ConnectionOptions = {
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    entities: [User, Tweet],
    synchronize: true,
    logging: false,
  };
  return createConnection(options);
});

afterEach(() => {
  const conn = getConnection();
  return conn.close();
});

const app = express();

app.use('/', users);

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
    .get('/')
    .expect('Content-Type', /json/)
    .expect(200);
  expect(result.body[0].id).toBe(1);
  expect(result.body[1].id).toBe(2);
  expect(result.body[0].name).toBe('Barack Obama');
  expect(result.body[1].name).toBe('Justin Bieber');
  expect(result.body[0].username).toBe('BarackObama');
  expect(result.body[1].username).toBe('justinbieber');
});

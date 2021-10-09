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
import options from './mock-database';

beforeEach(() => (
  createConnection(options)
));

afterEach(() => {
  const conn = getConnection();
  return conn.close();
});

const user1 = {
  name: 'Barack Obama',
  username: 'BarackObama',
};

const user2 = {
  name: 'Justin Bieber',
  username: 'justinbieber',
};

const user3 = {
  name: 'jack',
  username: 'jack',
  deletedAt: new Date(Date.now()),
};

const app = express();

app.use('/users', usersRouter);

test('GET users', async () => {
  const userRepository = getRepository(User);
  await userRepository.insert(user1);
  await userRepository.insert(user2);
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

test('GET users with a (soft) deleted entry', async () => {
  const userRepository = getRepository(User);
  await userRepository.insert(user1);
  await userRepository.insert(user2);
  await userRepository.insert(user3);
  const result = await request(app)
    .get('/users')
    .expect('Content-Type', /json/)
    .expect(200);
  expect(result.body.length).toBe(2);
});

test('GET users/:id', async () => {
  const userRepository = getRepository(User);
  await userRepository.insert(user1);
  const result = await request(app)
    .get('/users/1')
    .expect('Content-Type', /json/)
    .expect(200);
  expect(result.body.id).toBe(1);
  expect(result.body.name).toBe('Barack Obama');
  expect(result.body.username).toBe('BarackObama');
});

test('GET users/:id deleted', async () => {
  const userRepository = getRepository(User);
  await userRepository.insert(user3);
  await request(app)
    .get('/users/1')
    .expect('Content-Type', /json/)
    .expect(405)
    .expect(`{"error":"Not Found","resource":"user","id":${1}}`);
});

test('GET users/:id not number', async () => {
  const userRepository = getRepository(User);
  await userRepository.insert(user1);
  await userRepository.insert(user2);
  await userRepository.insert(user3);
  const result = await request(app)
    .get('/users/abc')
    .expect('Content-Type', /json/)
    .expect(405);
  expect(result.body.error).toBe('Invalid Request');
  expect(result.body.resource).toBe('user');
  expect(result.body.id).toBe('abc');
  expect(result.body.message).toBe('The `id` query parameter value [abc] is not a number');
});

test('GET users/by/username/:username', async () => {
  const userRepository = getRepository(User);
  await userRepository.insert(user1);
  const result = await request(app)
    .get('/users/by/username/BarackObama')
    .expect('Content-Type', /json/)
    .expect(200);
  expect(result.body.id).toBe(1);
  expect(result.body.name).toBe('Barack Obama');
  expect(result.body.username).toBe('BarackObama');
});

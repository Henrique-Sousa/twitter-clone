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

const deletedUser = {
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
  await userRepository.insert(deletedUser);
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
  await userRepository.insert(user1);
  await userRepository.insert(user2);
  await request(app)
    .get('/users/4')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(`{"error":"Not Found","resource":"user","id":${4}}`);
});

test('GET users/:id not number', async () => {
  const userRepository = getRepository(User);
  await userRepository.insert(user1);
  await userRepository.insert(user2);
  await userRepository.insert(deletedUser);
  const result = await request(app)
    .get('/users/1.2')
    .expect('Content-Type', /json/)
    .expect(400);
  expect(result.body.error).toBe('Invalid Request');
  expect(result.body.resource).toBe('user');
  expect(result.body.id).toBe('1.2');
  expect(result.body.message).toBe('The `id` query parameter value [1.2] does not match ^[0-9]{1,19}$');
});

test('GET users/1a', async () => {
  const userRepository = getRepository(User);
  await userRepository.insert(user1);
  await userRepository.insert(user2);
  await userRepository.insert(deletedUser);
  const result = await request(app)
    .get('/users/1a')
    .expect('Content-Type', /json/)
    .expect(400);
  expect(result.body.error).toBe('Invalid Request');
  expect(result.body.resource).toBe('user');
  expect(result.body.id).toBe('1a');
  expect(result.body.message).toBe('The `id` query parameter value [1a] does not match ^[0-9]{1,19}$');
});

test('GET users/1a', async () => {
  const userRepository = getRepository(User);
  await userRepository.insert(user1);
  await userRepository.insert(user2);
  await userRepository.insert(deletedUser);
  const result = await request(app)
    .get('/users/12345678901234567890')
    .expect('Content-Type', /json/)
    .expect(400);
  expect(result.body.error).toBe('Invalid Request');
  expect(result.body.resource).toBe('user');
  expect(result.body.id).toBe('12345678901234567890');
  expect(result.body.message).toBe('The `id` query parameter value [12345678901234567890] does not match ^[0-9]{1,19}$');
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

test('GET users/by/username/:username non existent', async () => {
  const userRepository = getRepository(User);
  await userRepository.insert(user1);
  await request(app)
    .get('/users/by/username/jack')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect('{"error":"Not Found","resource":"user","username":"jack"}');
});

test('GET users/by/username/:username contains strange characters', async () => {
  const userRepository = getRepository(User);
  await userRepository.insert(user1);
  const result = await request(app)
    .get('/users/by/username/a.b')
    .expect(400);
  expect(result.body.error).toBe('Invalid Request');
  expect(result.body.resource).toBe('user');
  expect(result.body.username).toBe('a.b');
  expect(result.body.message).toBe('The `username` query parameter value [a.b] does not match ^[A-Za-z0-9_]{1,15}$');
});

test('GET users/by/username/:username greater than 15', async () => {
  const userRepository = getRepository(User);
  await userRepository.insert(user1);
  const result = await request(app)
    .get('/users/by/username/abcdefghijklmnop')
    .expect(400);
  expect(result.body.error).toBe('Invalid Request');
  expect(result.body.resource).toBe('user');
  expect(result.body.username).toBe('abcdefghijklmnop');
  expect(result.body.message).toBe('The `username` query parameter value [abcdefghijklmnop] does not match ^[A-Za-z0-9_]{1,15}$');
});

test('GET users/by/username/ (empty username)', async () => {
  const userRepository = getRepository(User);
  await userRepository.insert(user1);
  await request(app)
    .get('/users/by/username/')
    .expect(404);
});

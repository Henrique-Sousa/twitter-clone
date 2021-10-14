import 'reflect-metadata';
import request from 'supertest';
import express from 'express';
import {
  createConnection, getConnection, getRepository,
} from 'typeorm';
import bcrypt from 'bcryptjs';
import { Buffer } from 'buffer';
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
  password: 'password',
};

const user2 = {
  name: 'Justin Bieber',
  username: 'justinbieber',
  password: '12345678',
};

const deletedUser = {
  name: 'jack',
  username: 'jack',
  password: bcrypt.hashSync('password', 10),
  deletedAt: new Date(Date.now()),
};

const user1Hashed = {
  name: 'Barack Obama',
  username: 'BarackObama',
  password: bcrypt.hashSync('password', 10),
};

const user2Hashed = {
  name: 'Justin Bieber',
  username: 'justinbieber',
  password: bcrypt.hashSync('12345678', 10),
};

const app = express();
app.use(express.json());

app.use('/users', usersRouter);

test('GET users', async () => {
  const userRepository = getRepository(User);
  await userRepository.insert(user1);
  await userRepository.insert(user2);
  const result = await request(app)
    .get('/users')
    .expect('Content-Type', /json/)
    .expect(200);
  expect(result.body[0]).not.toHaveProperty('password');
  expect(result.body[1]).not.toHaveProperty('password');
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
  expect(result.body).not.toHaveProperty('password');
  expect(result.body.id).toBe(1);
  expect(result.body.name).toBe('Barack Obama');
  expect(result.body.username).toBe('BarackObama');
});

test('GET users/:id non existent', async () => {
  const userRepository = getRepository(User);
  await userRepository.insert(user1);
  await userRepository.insert(user2);
  const result = await request(app)
    .get('/users/4')
    .expect('Content-Type', /json/)
    .expect(200);
  expect(result.body).toHaveProperty('error');
  const { error } = result.body;
  expect(error.title).toBe('Not Found Error');
  expect(error.detail).toBe('Could not find user with id: [4].');
  expect(error.resource_type).toBe('user');
  expect(error.resource_id).toBe('4');
  expect(error.parameter).toBe('id');
});

test('GET users/1.2', async () => {
  const userRepository = getRepository(User);
  await userRepository.insert(user1);
  await userRepository.insert(user2);
  await userRepository.insert(deletedUser);
  const result = await request(app)
    .get('/users/1.2')
    .expect('Content-Type', /json/)
    .expect(400);
  expect(result.body).toHaveProperty('error');
  const { error } = result.body;
  expect(error.title).toBe('Invalid Request');
  expect(error.detail).toBe('The `id` query parameter value [1.2] does not match ^[0-9]{1,19}$');
  expect(error.id).toBe('1.2');
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
  expect(result.body).toHaveProperty('error');
  const { error } = result.body;
  expect(error.title).toBe('Invalid Request');
  expect(error.detail).toBe('The `id` query parameter value [1a] does not match ^[0-9]{1,19}$');
  expect(error.id).toBe('1a');
});

test('GET users/12345678901234567890', async () => {
  const userRepository = getRepository(User);
  await userRepository.insert(user1);
  await userRepository.insert(user2);
  await userRepository.insert(deletedUser);
  const result = await request(app)
    .get('/users/12345678901234567890')
    .expect('Content-Type', /json/)
    .expect(400);
  expect(result.body).toHaveProperty('error');
  const { error } = result.body;
  expect(error.title).toBe('Invalid Request');
  expect(error.detail).toBe('The `id` query parameter value [12345678901234567890] does not match ^[0-9]{1,19}$');
  expect(error.id).toBe('12345678901234567890');
});

test('GET users/by/username/:username', async () => {
  const userRepository = getRepository(User);
  await userRepository.insert(user1);
  const result = await request(app)
    .get('/users/by/username/BarackObama')
    .expect('Content-Type', /json/)
    .expect(200);
  expect(result.body).not.toHaveProperty('password');
  expect(result.body.id).toBe(1);
  expect(result.body.name).toBe('Barack Obama');
  expect(result.body.username).toBe('BarackObama');
});

test('GET users/by/username/:username non existent', async () => {
  const userRepository = getRepository(User);
  await userRepository.insert(user1);
  const result = await request(app)
    .get('/users/by/username/jack')
    .expect('Content-Type', /json/)
    .expect(200);
  expect(result.body).toHaveProperty('error');
  const { error } = result.body;
  expect(error.title).toBe('Not Found Error');
  expect(error.detail).toBe('Could not find user with username: [jack].');
  expect(error.resource_type).toBe('user');
  expect(error.resource_id).toBe('jack');
  expect(error.parameter).toBe('username');
});

test('GET users/by/username/a.b', async () => {
  const userRepository = getRepository(User);
  await userRepository.insert(user1);
  const result = await request(app)
    .get('/users/by/username/a.b')
    .expect(400);
  expect(result.body).toHaveProperty('error');
  const { error } = result.body;
  expect(error.title).toBe('Invalid Request');
  expect(error.detail).toBe('The `username` query parameter value [a.b] does not match ^[A-Za-z0-9_]{1,15}$');
  expect(error.username).toBe('a.b');
});

test('GET users/by/username/:username greater than 15', async () => {
  const userRepository = getRepository(User);
  await userRepository.insert(user1);
  const result = await request(app)
    .get('/users/by/username/abcdefghijklmnop')
    .expect(400);
  expect(result.body).toHaveProperty('error');
  const { error } = result.body;
  expect(error.title).toBe('Invalid Request');
  expect(error.detail).toBe('The `username` query parameter value [abcdefghijklmnop] does not match ^[A-Za-z0-9_]{1,15}$');
  expect(error.username).toBe('abcdefghijklmnop');
});

test('GET users/by/username/ (empty username)', async () => {
  const userRepository = getRepository(User);
  await userRepository.insert(user1);
  await request(app)
    .get('/users/by/username/')
    .expect(404);
});

test('create user', async () => {
  const userRepository = getRepository(User);
  await request(app)
    .post('/users/')
    .set('Content-type', 'application/json')
    .send(user1);
  const result = await userRepository.findOne(1);
  expect(result);
  if (result) {
    expect(result.id).toBe(1);
    expect(result.name).toBe('Barack Obama');
    expect(result.username).toBe('BarackObama');
  }
});

test('user login', async () => {
  const userRepository = getRepository(User);
  await userRepository.insert(user1Hashed);
  const result = await request(app)
    .post('/users/login')
    .set('Content-type', 'application/json')
    .send(user1)
    .expect(200);
  expect(result.body.success).toBe(true);
  expect(result.body.expires).toBe('1d');
  const token: Array<string> = result.body.token.split(' ');
  expect(token[0]).toBe('Bearer');
  const header: string = token[1].split('.')[0];
  const payload: string = token[1].split('.')[1];
  const headerObject = JSON.parse(Buffer.from(header, 'base64').toString('ascii'));
  const payloadObject = JSON.parse(Buffer.from(payload, 'base64').toString('ascii'));
  expect(headerObject.alg).toBe('RS256');
  expect(headerObject.typ).toBe('JWT');
  expect(payloadObject.sub).toBe(1);
  expect(payloadObject).toHaveProperty('iat');
  expect(payloadObject).toHaveProperty('exp');
});

test('user login non existent username', async () => {
  const userRepository = getRepository(User);
  await userRepository.insert(user1Hashed);
  const wrongUser = {
    name: 'Barack Obama',
    username: 'BarackObam',
    password: 'password',
  };
  const result = await request(app)
    .post('/users/login')
    .set('Content-type', 'application/json')
    .send(wrongUser)
    .expect(401);
  expect(result.body.success).toBe(false);
  expect(result.body).toHaveProperty('error');
  const { error } = result.body;
  expect(error.title).toBe('Not Found Error');
  expect(error.detail).toBe('Could not find user with username: [BarackObam].');
});

test('user login with wrong password', async () => {
  const userRepository = getRepository(User);
  await userRepository.insert(user1Hashed);
  const wrongPassUser = {
    name: 'Barack Obama',
    username: 'BarackObama',
    password: 'pssword',
  };
  const result = await request(app)
    .post('/users/login')
    .set('Content-type', 'application/json')
    .send(wrongPassUser)
    .expect(401);
  expect(result.body.success).toBe(false);
  expect(result.body).toHaveProperty('error');
  const { error } = result.body;
  expect(error.title).toBe('Wrong Password Error');
  expect(error.detail).toBe('You entered the wrong password');
});

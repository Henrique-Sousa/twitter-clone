import 'reflect-metadata';
import request from 'supertest';
import express from 'express';
import bcrypt from 'bcryptjs';
import {
  createConnection, getConnection, getRepository,
} from 'typeorm';
import passport from 'passport';
import User from '../entity/User';
import Tweet from '../entity/Tweet';
import tweets from '../routes/tweets';
import options from './mock-database';
import usersRouter from '../routes/users';
import '../config/passportConfig';

interface UserResult {
  id: number;
  name: string
  username: string;
  createdAt: string;
}

interface TweetResult {
  id: number;
  text: string;
  createdAt: string;
  user: UserResult;
}

beforeEach(() => (
  createConnection(options)
));

afterEach(() => {
  const conn = getConnection();
  return conn.close();
});

const user1 = {
  name: 'Data Science Fact',
  username: 'DataSciFact',
  password: 'password',
};

const user1Hashed = {
  name: 'Data Science Fact',
  username: 'DataSciFact',
  password: bcrypt.hashSync('password', 10),
};

const user2 = {
  name: 'jack',
  username: 'jack',
  password: '12345678',
};

const user2Hashed = {
  name: 'jack',
  username: 'jack',
  password: bcrypt.hashSync('12345678', 10),
};

const text1 = 'The kinds of people who respond to surveys are different from the kinds of people who do not.';
const text2 = 'If hat(theta) is a the MLE of theta, f(hat(theta)) is the MLE of f(theta) for any function f.';
const text3 = 'just setting up my twttr';

const app = express();

app.use(passport.initialize());

app.use(express.json());

app.use('/tweets', tweets);
app.use('/users', usersRouter);

test('GET tweets', async () => {
  const userRepository = getRepository(User);
  const tweetRepository = getRepository(Tweet);
  await userRepository.insert(user1);
  await tweetRepository.insert({
    user: user1,
    text: text1,
  });
  await tweetRepository.insert({
    user: user1,
    text: text2,
  });
  const result = await request(app)
    .get('/tweets/')
    .expect('Content-Type', /json/)
    .expect(200);
  const element1 = result.body.find((e: TweetResult) => e.id === 1);
  const element2 = result.body.find((e: TweetResult) => e.id === 2);
  expect(element1.id).toBe(1);
  expect(element2.id).toBe(2);
  expect(element1.text).toBe(text1);
  expect(element2.text).toBe(text2);
  expect(element1.user.username).toBe('DataSciFact');
  expect(element2.user.username).toBe('DataSciFact');
});

test('GET tweets/:id', async () => {
  const userRepository = getRepository(User);
  const tweetRepository = getRepository(Tweet);
  await userRepository.insert(user2);
  await tweetRepository.insert({
    user: user2,
    text: text3,
  });
  const result = await request(app)
    .get('/tweets/1')
    .expect('Content-Type', /json/)
    .expect(200);
  expect(result.body.id).toBe(1);
  expect(result.body.user.name).toBe('jack');
  expect(result.body.user.username).toBe('jack');
  expect(result.body.text).toBe(text3);
});

test('GET tweets/3.4', async () => {
  const userRepository = getRepository(User);
  const tweetRepository = getRepository(Tweet);
  await userRepository.insert(user1);
  await tweetRepository.insert({
    user: user1,
    text: text1,
  });
  const result = await request(app)
    .get('/tweets/3.4')
    .expect(400)
    .expect('Content-Type', /json/);
  expect(result.body).toHaveProperty('error');
  const { error } = result.body;
  expect(error.title).toBe('Invalid Request');
  expect(error.detail).toBe('The `id` query parameter value [3.4] does not match ^[0-9]{1,19}$');
  expect(error.id).toBe('3.4');
});

test('GET tweets/12345678901234567890', async () => {
  const userRepository = getRepository(User);
  const tweetRepository = getRepository(Tweet);
  await userRepository.insert(user1);
  await tweetRepository.insert({
    user: user1,
    text: text1,
  });
  const result = await request(app)
    .get('/tweets/12345678901234567890')
    .expect('Content-Type', /json/)
    .expect(400);
  expect(result.body).toHaveProperty('error');
  const { error } = result.body;
  expect(error.title).toBe('Invalid Request');
  expect(error.detail).toBe('The `id` query parameter value [12345678901234567890] does not match ^[0-9]{1,19}$');
  expect(error.id).toBe('12345678901234567890');
});

test('create tweet', async () => {
  const userRepository = getRepository(User);
  const tweetRepository = getRepository(Tweet);
  await userRepository.insert(user1Hashed);
  await userRepository.insert(user2Hashed);
  const loginResponse = await request(app)
    .post('/users/login')
    .set('Content-type', 'application/json')
    .send(user2);
  const { token } = loginResponse.body;
  const result = await request(app)
    .post('/tweets/')
    .set('Content-type', 'application/json')
    .set('Authorization', token)
    .send({ text: text3 });
  const dbResult = await tweetRepository.findOne(1, {
    relations: ['user'],
  });
  expect(dbResult).not.toBe(undefined);
  expect(dbResult).toHaveProperty('id');
  expect(dbResult).toHaveProperty('text');
  expect(dbResult).toHaveProperty('createdAt');
  expect(dbResult).toHaveProperty('user');
  if (dbResult) {
    expect(dbResult.id).toBe(1);
    expect(dbResult.text).toBe(text3);
    expect(dbResult.user.name).toBe('jack');
    expect(dbResult.user.username).toBe('jack');
  }
  expect(JSON.stringify(result) === JSON.stringify(dbResult));
});

test('create tweet user not logged in', async () => {
  const result = await request(app)
    .post('/tweets/')
    .set('Content-type', 'application/json')
    .send({ text: text3 })
    .expect(401);
  expect(result.text).toBe('Unauthorized');
});

test('delete tweet', async () => {
  const userRepository = getRepository(User);
  const tweetRepository = getRepository(Tweet);
  await userRepository.insert(user1Hashed);
  await userRepository.insert(user2Hashed);
  await tweetRepository.insert({
    user: user1Hashed,
    text: text1,
  });
  await tweetRepository.insert({
    user: user2Hashed,
    text: text3,
  });
  const loginResponse = await request(app)
    .post('/users/login')
    .set('Content-type', 'application/json')
    .send(user1);

  const { token } = loginResponse.body;

  await request(app)
    .delete('/tweets/1')
    .set('Authorization', token);

  const result = await tweetRepository.find({
    relations: ['user'],
  });

  expect(result.length).toBe(1);
  expect(result[0].id).toBe(2);
  expect(result[0].text).toBe(text3);
  expect(result[0]).toHaveProperty('createdAt');
  expect(result[0].user.name).toBe('jack');
  expect(result[0].user.username).toBe('jack');
});

it('should not delete tweet of wrong user', async () => {
  const userRepository = getRepository(User);
  const tweetRepository = getRepository(Tweet);
  await userRepository.insert(user1Hashed);
  await userRepository.insert(user2Hashed);
  await tweetRepository.insert({
    user: user1Hashed,
    text: text1,
  });
  await tweetRepository.insert({
    user: user2Hashed,
    text: text3,
  });
  const loginResponse = await request(app)
    .post('/users/login')
    .set('Content-type', 'application/json')
    .send(user1);

  const { token } = loginResponse.body;

  const response = await request(app)
    .delete('/tweets/2')
    .set('Authorization', token);
  expect(response.text).toBe('Unauthorized');

  const result = await tweetRepository.find({
    relations: ['user'],
  });

  expect(result.length).toBe(2);
  expect(result[1].id).toBe(2);
  expect(result[1].text).toBe(text3);
  expect(result[1]).toHaveProperty('createdAt');
  expect(result[1].user.name).toBe('jack');
  expect(result[1].user.username).toBe('jack');
});

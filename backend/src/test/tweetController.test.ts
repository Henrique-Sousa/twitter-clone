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
import tweets from '../routes/tweets';

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

app.use('/', tweets);

interface TweetResult {
  id: number;
  text: string;
  createdAt: string;
  deletedAt?: string | null;
  user: {
    id: number;
    name: string
    username: string;
    createdAt: string;
    deletedAt: string | null;
  };
}

test('GET tweets route', async () => {
  const userRepository = getRepository(User);
  const tweetRepository = getRepository(Tweet);
  const user = {
    name: 'Data Science Fact',
    username: 'DataSciFact',
  };
  const text1 = 'The kinds of people who respond to surveys are different from the kinds of people who do not.';
  const text2 = 'If hat(theta) is a the MLE of theta, f(hat(theta)) is the MLE of f(theta) for any function f.';
  await userRepository.insert(user);
  await tweetRepository.insert({
    user,
    text: text1,
  });
  await tweetRepository.insert({
    user,
    text: text2,
  });
  const result = await request(app)
    .get('/')
    .expect('Content-Type', /json/)
    .expect(200);
  const element1 = result.body.find((e: TweetResult) => e.id === 1);
  const element2 = result.body.find((e: TweetResult) => e.id === 2);
  expect(element1.user.username).toBe('DataSciFact');
  expect(element2.user.username).toBe('DataSciFact');
  expect(element1.id).toBe(1);
  expect(element2.id).toBe(2);
  expect(element1.text).toBe(text1);
  expect(element2.text).toBe(text2);
});

test('GET tweets/:id route', async () => {
  const userRepository = getRepository(User);
  const tweetRepository = getRepository(Tweet);
  const user = {
    name: 'jack',
    username: 'jack',
  };
  const text = 'just setting up my twttr';
  await userRepository.insert(user);
  await tweetRepository.insert({ user, text });
  const result = await request(app)
    .get('/1')
    .expect('Content-Type', /json/)
    .expect(200);
  expect(result.body.id).toBe(1);
  expect(result.body.user.name).toBe('jack');
  expect(result.body.user.username).toBe('jack');
  expect(result.body.text).toBe(text);
});
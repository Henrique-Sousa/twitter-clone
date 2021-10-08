import 'reflect-metadata';
import request from 'supertest';
import express from 'express';
import {
  createConnection,
  getConnection,
  getRepository,
} from 'typeorm';
import User from '../entity/User';
import Tweet from '../entity/Tweet';
import tweets from '../routes/tweets';
import options from './mock-database';

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
};

const user2 = {
  name: 'jack',
  username: 'jack',
};

const text1 = 'The kinds of people who respond to surveys are different from the kinds of people who do not.';
const text2 = 'If hat(theta) is a the MLE of theta, f(hat(theta)) is the MLE of f(theta) for any function f.';
const text3 = 'just setting up my twttr';

const app = express();

app.use('/', tweets);

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

test('GET tweets with a (soft) deleted entry', async () => {
  const userRepository = getRepository(User);
  const tweetRepository = getRepository(Tweet);
  await userRepository.insert(user1);
  await userRepository.insert(user2);
  await tweetRepository.insert({
    user: user1,
    text: text1,
  });
  await tweetRepository.insert({
    user: user1,
    text: text2,
    deletedAt: new Date(Date.now()),
  });
  await tweetRepository.insert({
    user: user2,
    text: text3,
  });
  const result = await request(app)
    .get('/')
    .expect('Content-Type', /json/)
    .expect(200);
  expect(result.body.length).toBe(2);
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
    .get('/1')
    .expect('Content-Type', /json/)
    .expect(200);
  expect(result.body.id).toBe(1);
  expect(result.body.user.name).toBe('jack');
  expect(result.body.user.username).toBe('jack');
  expect(result.body.text).toBe(text3);
});

test('GET tweets/:id deleted', async () => {
  const userRepository = getRepository(User);
  const tweetRepository = getRepository(Tweet);
  await userRepository.insert(user1);
  await tweetRepository.insert({
    user: user1,
    text: text1,
    deletedAt: new Date(Date.now()),
  });
  await request(app)
    .get('/1')
    .expect(200)
    .expect('Content-Type', /json/)
    .expect('{"error":"Not Found","resource":"tweet","id":"1"}');
});

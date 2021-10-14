import 'reflect-metadata';
import {
  createConnection,
  ConnectionOptions,
  getRepository,
} from 'typeorm';
import bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';
import User from '../src/entity/User';
import Tweet from '../src/entity/Tweet';

dotenv.config({ path: `${__dirname}/../.env` });

const options: ConnectionOptions = {
  type: 'postgres',
  port: 5432,
  host: process.env.NODE_ENV === 'production' ? process.env.POSTGRES_HOST : 'localhost',
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: true,
  logging: false,
  entities: [User, Tweet],
};

const user1 = {
  name: 'Data Science Fact',
  username: 'DataSciFact',
  password: bcrypt.hashSync('password', 10),
};

const user2 = {
  name: 'jack',
  username: 'jack',
  password: bcrypt.hashSync('12345678', 10),
};

const text1 = 'The kinds of people who respond to surveys are different from the kinds of people who do not.';
const text2 = 'If hat(theta) is a the MLE of theta, f(hat(theta)) is the MLE of f(theta) for any function f.';
const text3 = 'just setting up my twttr';

(async () => {
  await createConnection(options);

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
  });
  await tweetRepository.insert({
    user: user2,
    text: text3,
  });
})();

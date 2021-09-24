import 'reflect-metadata';
import {
  createConnection,
  ConnectionOptions,
  getRepository,
} from 'typeorm';
import * as dotenv from 'dotenv';
import User from './src/entity/User';
import Tweet from './src/entity/Tweet';
import './src/database';

dotenv.config();

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

(async () => {
  await createConnection(options);

  const userRepository = getRepository(User);
  const tweetRepository = getRepository(Tweet);
  await userRepository.insert({
    name: 'Data Science Fact',
    username: 'DataSciFact',
  });
  const user = await userRepository.findOne(1);
  await tweetRepository.insert({
    user,
    text: 'The kinds of people who respond to surveys are different from the kinds of people who do not.',
  });
  await tweetRepository.insert({
    user,
    text: 'If hat(theta) is a the MLE of theta, f(hat(theta)) is the MLE of f(theta) for any function f.',
  });
})();

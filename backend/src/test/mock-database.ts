import { ConnectionOptions } from 'typeorm';
import User from '../entity/User';
import Tweet from '../entity/Tweet';

const options: ConnectionOptions = {
  type: 'sqlite',
  database: ':memory:',
  dropSchema: true,
  entities: [User, Tweet],
  synchronize: true,
  logging: false,
};

export default options;

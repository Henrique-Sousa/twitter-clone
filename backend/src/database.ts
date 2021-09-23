import { createConnection, ConnectionOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import User from './entity/User';
import Tweet from './entity/Tweet';

const getConnection = async () => {
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
  const connection = await createConnection(options);
  return connection;
};

const connection = getConnection();

export default connection;

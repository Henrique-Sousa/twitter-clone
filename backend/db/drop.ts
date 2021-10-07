import 'reflect-metadata';
import {
  createConnection,
  ConnectionOptions,
  QueryRunner,
} from 'typeorm';
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

(async () => {
  const conn = await createConnection(options);
  const queryRunner: QueryRunner = conn.createQueryRunner();
  await queryRunner.dropTable('tweet');
  await queryRunner.dropTable('user');
  conn.close();
})();

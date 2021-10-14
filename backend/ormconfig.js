module.exports = {
  type: 'postgres',
  port: 5432,
  host: process.env.NODE_ENV === 'production' ? process.env.POSTGRES_HOST : 'localhost',
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: false,
  logging: false,
  entities: ['build/src/entity/**/*.js'],
  migrationsTableName: 'migration',
  migrations: ['build/db/migration/*.js'],
  cli: {
    migrationsDir: 'db/migration',
  },
};

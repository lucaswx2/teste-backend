require('dotenv/config');
module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: false,
  entities: ['src/domains/**/infra/typeorm/entities/**.ts'],
  migrations: ['src/shared/infra/typeorm/migrations/*.ts'],
  cli: {
    migrationsDir: 'src/shared/infra/typeorm/migrations',
    entitiesDir: 'src/domains/**/infra/typeorm/entities',
  },
};

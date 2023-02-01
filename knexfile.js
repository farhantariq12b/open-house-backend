require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DB_URL,
    searchPath: ['knex', 'public'],
    migrations: {
      directory: './src/databases/migrations',
    },
    seeds: { directory: './src/databases/seeds' },
  },

  testing: {
    client: 'pg',
    connection: process.env.DB_URL,
    searchPath: ['knex', 'public'],
    migrations: {
      directory: './src/databases/migrations',
    },
    seeds: { directory: './src/databases/seeds' },
  },

  production: {
    client: 'pg',
    connection: process.env.DB_URL,
    searchPath: ['knex', 'public'],
    migrations: {
      directory: './src/databases/migrations',
    },
    seeds: { directory: './src/databases/seeds' },
  },
};

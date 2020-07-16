// Update with your config settings.
require("dotenv").config();

var types = require('pg').types;
types.setTypeParser(1082, val => val);

module.exports = {
  development: {
    client: 'pg',
    connection: process.env.connectionString,
    migrations: {
      directory: './database/migrations'
    },
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'pg',
    connection: process.env.connectionString,
    migrations: {
      directory: './database/migrations'
    },
    pool: {
      min: 2,
      max: 10
    },
  }

};
const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const { DATABASE_URL, TEST_DATABASE_URL, NODE_ENV } = process.env;
let connectionString = '';

if (NODE_ENV === 'test') {
  connectionString = TEST_DATABASE_URL;
} else {
  connectionString = DATABASE_URL;
}

const pool = new Pool({
  connectionString,
});

pool.on('connect', () => {

});

/**
 * Create Tables
 */
const createTables = () => {
  const queryText =
    `CREATE TABLE IF NOT EXISTS
      users(
        id SERIAL PRIMARY KEY,
        email VARCHAR(50) NOT NULL,
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        password VARCHAR(255) NOT NULL,
        is_admin BOOLEAN NOT NULL
      )`;

  pool.query(queryText)
    .then((res) => {
      pool.end();
    })
    .catch((err) => {
      pool.end();
    });
};

/**
 * Drop Tables
 */
const dropTables = () => {
  const queryText = 'DROP TABLE IF EXISTS users';
  pool.query(queryText)
    .then((res) => {
      pool.end();
    })
    .catch((err) => {
      pool.end();
    });
};

pool.on('remove', () => {
  process.exit(0);
});

module.exports = {
  createTables,
  dropTables,
};

require('make-runnable');

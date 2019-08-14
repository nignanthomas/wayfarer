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
const createUserTable = () => {
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

const createTripTable = () => {
  const queryText =
    `CREATE TABLE IF NOT EXISTS
      trips(
        id SERIAL PRIMARY KEY,
        seating_capacity INTEGER NOT NULL,
        bus_license_number VARCHAR(50) NOT NULL,
        origin VARCHAR(50) NOT NULL,
        destination VARCHAR(50) NOT NULL,
        trip_date VARCHAR(50) NOT NULL,
        fare INTEGER NOT NULL,
        status INTEGER NOT NULL DEFAULT 1
      )`;

  pool.query(queryText)
    .then((res) => {
      pool.end();
    })
    .catch((err) => {
      pool.end();
    });
};

const createBookingTable = () => {
  const queryText =
    `CREATE TABLE IF NOT EXISTS
      bookings(
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        trip_id INTEGER NOT NULL,
        seat_number INTEGER NOT NULL,
        created_on VARCHAR(50) NOT NULL
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
const dropUserTable = () => {
  const queryText = 'DROP TABLE IF EXISTS users';
  pool.query(queryText)
    .then((res) => {
      pool.end();
    })
    .catch((err) => {
      pool.end();
    });
};

const dropTripTable = () => {
  const queryText = 'DROP TABLE IF EXISTS trips';
  pool.query(queryText)
    .then((res) => {
      pool.end();
    })
    .catch((err) => {
      pool.end();
    });
};

const dropBookingTable = () => {
  const queryText = 'DROP TABLE IF EXISTS trips';
  pool.query(queryText)
    .then((res) => {
      pool.end();
    })
    .catch((err) => {
      pool.end();
    });
};

/**
 * Create All Tables
 */
const createTables = () => {
  createUserTable();
  createTripTable();
  createBookingTable();
};
/**
 * Drop All Tables
 */
const dropTables = () => {
  dropUserTable();
  dropTripTable();
  dropBookingTable();
};

pool.on('remove', () => {
  process.exit(0);
});

module.exports = {
  createUserTable,
  dropUserTable,
  createTripTable,
  dropTripTable,
  createBookingTable,
  dropBookingTable,
  createTables,
  dropTables,
};

require('make-runnable');

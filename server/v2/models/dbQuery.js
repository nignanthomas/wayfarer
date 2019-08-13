import { Pool } from 'pg';
import dotenv from 'dotenv';

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
console.log('connectionString1', connectionString);

const query = (text, params) => {
  return new Promise((resolve, reject) => {
    pool.query(text, params)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports = {
  query,
};

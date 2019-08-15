import { query } from './dbQuery';
import { getAllQuery, getOneQuery } from '../helpers/dbQueriesHelper';


const createUser = async (data) => {
  const createQuery = `INSERT INTO
      users(email, first_name, last_name, password, is_admin)
      VALUES($1, $2, $3, $4, $5)
      returning *`;
  const values = [
    data.email,
    data.first_name,
    data.last_name,
    data.password,
    data.is_admin || false,
  ];
  try {
    const { rows } = await query(createQuery, values);
    return rows[0];
  } catch (error) {
    throw error;
  }
};

const getOneUserDB = async id => getOneQuery('users', id);

const getAllUsersDB = async () => getAllQuery('users');

const getUserByEmail = async (email) => {
  const oneQuery = 'SELECT * FROM users WHERE email = $1';
  const emails = [email];
  try {
    const { rows } = await query(oneQuery, emails);
    return rows[0];
  } catch (error) {
    return error;
  }
};


module.exports = {
  createUser,
  getOneUserDB,
  getAllUsersDB,
  getUserByEmail,
};

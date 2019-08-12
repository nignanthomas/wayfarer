import users from '../data/users.json';
import { nextId } from '../helpers/nextId';
import { query } from './dbQuery';

class User {
  constructor({
    id, email, first_name, last_name, password, is_admin
  }) {
    this.id = id;
    this.email = email;
    this.first_name = first_name;
    this.last_name = last_name;
    this.password = password;
    this.is_admin = is_admin;
  }
}

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

const getOneUser = id => users.find(user => user.id === id);

const getAllUsers = () => users;

const getOneUserDB = async (id) => {
  const oneQuery = 'SELECT * FROM users WHERE id = $1';
  try {
    const { rows } = await query(oneQuery, id);
    return rows[0];
  } catch (error) {
    return error;
  }
};

const getAllUsersDB = async () => {
  const findAllQuery = 'SELECT * FROM users';
  try {
    const { rows } = await query(findAllQuery);
    return rows;
  } catch (error) {
    return error;
  }
};

const getUserByEmail = async (email) => {
  const oneQuery = 'SELECT * FROM users WHERE email = $1';
  const emails = [email]
  try {
    const { rows } = await query(oneQuery, emails);
    return rows[0];
  } catch (error) {
    return error;
  }
};

module.exports = {
  createUser,
  getOneUser,
  getAllUsers,
  getOneUserDB,
  getAllUsersDB,
  getUserByEmail,
};

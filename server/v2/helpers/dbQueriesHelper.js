import { query } from '../models/dbQuery';

const getAllQuery = async (table) => {
  const findAllQuery = `SELECT * FROM ${table}`;
  try {
    const { rows } = await query(findAllQuery);
    return rows;
  } catch (error) {
    return error;
  }
};

const getOneQuery = async (table, id) => {
  const oneQuery = `SELECT * FROM ${table} WHERE id = $1`;
  const ids = [id];
  try {
    const { rows } = await query(oneQuery, ids);
    return rows[0];
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllQuery,
  getOneQuery,
};

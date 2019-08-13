import userModel from '../models/userModel';
import { idValidator } from '../helpers/idValidator';
import { responseSuccess, responseError } from '../helpers/responseHelpers';


const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsersDB();
    if (!users.length) {
      return responseError(res, 404, 'Oops! No Users found!');
    }
    return responseSuccess(res, 200, 'Users Successfully Fetched', users);
  } catch (err) {
    return responseError(res, 400, err);
  }
};

const getOneUser = async (req, res) => {
  const { error } = idValidator(req.params);
  if (error) {
    return responseError(res, 400, 'The user ID should be a number');
  }
  const userId = parseInt(req.params.id, 10);
  try {
    const user = await userModel.getOneUserDB(userId);
    if (user) {
      return responseSuccess(res, 200, 'User Successfully Fetched', user);
    }
    return responseError(res, 404, 'Oops! No Users found!');
  } catch (err) {
    return responseError(res, 400, err);
  }
};

module.exports = {
  getAllUsers,
  getOneUser,
};

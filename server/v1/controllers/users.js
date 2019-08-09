import userModel from '../models/userModel';
import { idValidator } from '../helpers/idValidator';
import { responseSuccess, responseError } from '../helpers/responseHelpers';


const getAllUsers = (req, res) => {
  const users = userModel.getAllUsers();
  if (!users.length) {
    return responseError(res, 404, 'Oops! No Users found!');
  }
  return responseSuccess(res, 200, 'Users Successfully Fetched', users);
};


const getOneUser = (req, res) => {
  const { error } = idValidator(req.params);
  if (error) {
    return responseError(res, 400, 'The user ID should be a number');
  }
  const userId = parseInt(req.params.id, 10);
  const user = userModel.getOneUser(userId);
  if (user) {
    return responseSuccess(res, 200, 'User Successfully Fetched', user);
  }
  return responseError(res, 404, 'Oops! No Users found!');
};

module.exports = {
  getAllUsers,
  getOneUser,
};

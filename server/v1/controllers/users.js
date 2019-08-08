import UserModel from '../models/userModel';
import { responseSuccess, responseError } from '../helpers/responseHelpers';


const User = {

  /**
  * @param {object} req
  * @param {object} res
  * @returns {array} users objects
  */
  getAllUsers(req, res) {
    const users = UserModel.getAllUsers();
    if (!users.length) {
      return responseError(res, 404, 'Oops! No Users found!');
    }
    return responseSuccess(res, 200, 'Users Successfully Fetched', users);
  },

  /**
  * @param {object} req
  * @param {object} res
  * @returns {object} user object
  */
  getOneUser(req, res) {
    const userId = parseInt(req.params.userId, 10);
    const user = UserModel.getOneUser(userId);
    if (user) {
      return responseSuccess(res, 200, 'User Successfully Fetched', user);
    }
    return responseError(res, 404, 'Oops! No Users found!');
  },

};
export default User;

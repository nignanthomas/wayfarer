import UserModel from '../models/userModel';
import { responseSuccess, responseError } from '../helpers/responseHelpers';


const User = {

  /**
  * @param {object} req
  * @param {object} res
  * @returns {array} users objects
  */
  getAllUsers(req, res) {
    if (!req.user.is_admin) {
      return responseError(res, 401, 'Unauthorized! Admin only!');
    }
    const users = UserModel.getAllUsers();
    if (!users.length) {
      return responseError(res, 404, 'Oops! No Users found!');
    }
    // return res.status(200).json({ status: 'success', data: users });
    return responseSuccess(res, 200, users);
  },

  /**
  * @param {object} req
  * @param {object} res
  * @returns {object} user object
  */
  getOneUser(req, res) {
    if (!req.user.is_admin) {
      return responseError(res, 401, 'Unauthorized! Admin only!');
    }
    const userId = parseInt(req.params.userId, 10);
    const user = UserModel.getOneUser(userId);
    if (user) {
      // return res.status(200).json({ status: 'success', data: user });
      return responseSuccess(res, 200, user);
    }
    return responseError(res, 404, 'Oops! No Users found!');
  },

};
export default User;

import UserModel from '../models/userModel';


const User = {

  /**
  * @param {object} req
  * @param {object} res
  * @returns {array} users objects
  */
  getAllUsers(req, res) {
    const users = UserModel.getAllUsers();
    if (!users.length) {
      return res.status(404).json({ status: 'Oops! No Users found!', data: [] });
    }
    return res.status(200).json({ status: 'success', data: users });
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
      return res.status(200).json({ status: 'success', data: user });
    }
    return res.status(404).json({ status: 'error', error: `Cannot find user of id: ${userId}` });
  },

};
export default User;

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

};
export default User;

import dotenv from 'dotenv';
import UserModel from '../../models/userModel';
import tokenGenerator from '../../helpers/signToken';
import { responseSuccess, responseError } from '../../helpers/responseHelpers';


dotenv.config();

const SignUp = {
  /**
  * @param {object} req
  * @param {object} res
  *@returns {object} user object
  */
  signUp(req, res) {
    const { body } = req;
    if (UserModel.getAllUsers().find(user => user.email === body.email)) {
      return responseError(res, 403, 'This email address is already in use!');
    }
    const newUser = UserModel.createUser(body);
    if (newUser.email === process.env.ADMIN_EMAIL) {
      newUser.is_admin = true;
    }
    const token = tokenGenerator.signToken(newUser);
    newUser.token = token;
    return responseSuccess(res, 201, 'User Successfully Created', { token: newUser.token, user: newUser });
  },
};
export default SignUp;

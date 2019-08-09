import dotenv from 'dotenv';
import userModel from '../../models/userModel';
import tokenGenerator from '../../helpers/signToken';
import { responseSuccess, responseError } from '../../helpers/responseHelpers';


dotenv.config();

const signUp = (req, res) => {
  const { body } = req;
  if (userModel.getAllUsers().find(user => user.email === body.email)) {
    return responseError(res, 403, 'This email address is already in use!');
  }
  const newUser = userModel.createUser(body);
  if (newUser.email === process.env.ADMIN_EMAIL) {
    newUser.is_admin = true;
  }
  const token = tokenGenerator.signToken(newUser);
  newUser.token = token;
  return responseSuccess(res, 201, 'User Successfully Created', { token: newUser.token, user: newUser });
};

module.exports = {
  signUp,
};

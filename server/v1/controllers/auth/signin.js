import tokenGenerator from '../../helpers/signToken';
import userModel from '../../models/userModel';
import { responseSuccess, responseError } from '../../helpers/responseHelpers';

const signIn = (req, res) => {
  const { body } = req;
  const user = userModel.getAllUsers().find(aUser => aUser.email === body.email);
  if (!user) {
    return responseError(res, 404, 'This user email is not registered');
  }
  const isMatch = user.password === body.password;
  if (!isMatch) {
    return responseError(res, 401, 'Unauthorized! The password is incorrect.');
  }
  const token = tokenGenerator.signToken(user);
  user.token = token;
  return responseSuccess(res, 201, 'User Successfully Logged in', { token: user.token });
};

module.exports = {
  signIn,
};

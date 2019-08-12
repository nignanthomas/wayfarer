import dotenv from 'dotenv';
import userModel from '../../models/userModel';
import tokenGenerator from '../../helpers/signToken';
import { responseSuccess, responseError } from '../../helpers/responseHelpers';


dotenv.config();

const signUp = async (req, res) => {
  const { body } = req;
  const aUser = await userModel.getUserByEmail(body.email);
  if (aUser) {
    return responseError(res, 409, 'This email address is already in use!');
  }
  try {
    if (body.email === process.env.ADMIN_EMAIL) {
      body.is_admin = true;
    }
    const newUser = await userModel.createUser(body);
    const token = tokenGenerator.signToken(newUser);
    newUser.token = token;
    let message = 'User Successfully Created';
    if (newUser.is_admin) {
      message = 'Superuser Created Successfully';
    }
    return responseSuccess(res, 201, message, { token: newUser.token });
  } catch (err) {
    return responseError(res, 400, err);
  }
};

module.exports = {
  signUp,
};

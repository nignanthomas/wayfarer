import UserModel from '../../models/userModel';
import tokenGenerator from '../../helpers/signToken';
import { responseSuccess, responseError } from '../../helpers/responseHelpers';


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
    const token = tokenGenerator.signToken(newUser);
    newUser.token = token;
    return responseSuccess(res, 201, 'User Successfully Created', { token: newUser.token });
  },
};
export default SignUp;

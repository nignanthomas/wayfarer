import UserModel from '../../models/userModel';
import tokenGenerator from '../../helpers/signToken';
import signupValidators from '../../helpers/signupValidators';
import responseHelpers from '../../helpers/responseHelpers';


const SignUp = {
  /**
  * @param {object} req
  * @param {object} res
  *@returns {object} user object
  */
  signUp(req, res) {
    const { body } = req;
    const { error } = signupValidators.validateSignup(body);
    if (error) {
      return responseHelpers.responseError(res, 400, error.details[0].message);
    }
    if (UserModel.getAllUsers().find(user => user.email === body.email)) {
      return responseHelpers.responseError(res, 403, 'This email address is already in use!');
    }
    const newUser = UserModel.createUser(body);
    const token = tokenGenerator.signToken(newUser);
    newUser.token = token;
    return responseHelpers.responseSuccess(res, 201, newUser);
  },
};
export default SignUp;

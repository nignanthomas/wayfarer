import tokenGenerator from '../../helpers/signToken';
import signinValidators from '../../helpers/signinValidators';
import UserModel from '../../models/userModel';
// import errorMessage from '../../helpers/joiErrorMessage';
import responseHelpers from '../../helpers/responseHelpers';

const SignIn = {
  /**
  * @param {object} req
  * @param {object} res
  *@returns {object} user object
  */
  signIn(req, res) {
    const { body } = req;
    const { error } = signinValidators.validateSignin(body);
    if (error) {
      // const message = errorMessage.errorMessage(error.details);
      return responseHelpers.responseError(res, 400, error.details[0].message);
    }
    // Find user given the email
    const user = UserModel.getAllUsers().find(aUser => aUser.email === body.email);
    // If not handle it
    if (!user) {
      return responseHelpers.responseError(res, 404, 'This user email is not registered');
    }
    // Check if the password is valid
    const isMatch = user.password === body.password;
    // If Not match, handle it
    if (!isMatch) {
      return responseHelpers.responseError(res, 401, 'Unauthorized! The password is incorrect.');
    }
    const token = tokenGenerator.signToken(user);
    user.token = token;
    return responseHelpers.responseSuccess(res, 201, user);
  },
};
export default SignIn;

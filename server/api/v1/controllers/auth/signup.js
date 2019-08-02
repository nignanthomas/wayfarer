import UserModel from '../../models/userModel';
import tokenGenerator from '../../helpers/signToken';
import signupValidators from '../../helpers/signupValidators';

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
      res.status(400).json({ status: 'error', error: error.details[0].message });
    }
    if (UserModel.getAllUsers().find(user => user.email === body.email)) {
      res.status(403).json({ status: 'error', error: 'This email address is already in use!' });
    }
    const newUser = UserModel.createUser(body);
    const token = tokenGenerator.signToken(newUser);
    newUser.token = token;
    return res.status(201).json({ status: 'success', data: newUser });
  },
};
export default SignUp;

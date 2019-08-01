import UserModel from '../../models/userModel';
import tokenGenerator from '../../helpers/signToken';

const SignUp = {
  /**
  * @param {object} req
  * @param {object} res
  *@returns {object} user object
  */
  signUp(req, res) {
    const { body } = req;
    if (!body.first_name || !body.last_name || !body.email || !body.password) {
      return res.status(400).json({ status: 'error', error: 'Bad Request! All Sign Up fields are required!' });
    }
    const newUser = UserModel.createUser(body);
    const token = tokenGenerator.signToken(newUser);
    return res.status(201).json({ status: 'success', data: newUser, token });
  },
};
export default SignUp;

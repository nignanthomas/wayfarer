import tokenGenerator from '../../helpers/signToken';
import signinValidators from '../../helpers/signinValidators';
import UserModel from '../../models/userModel';
// import errorMessage from '../../helpers/joiErrorMessage';

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
      res.status(400).json({ status: 'error', error: error.details[0].message });
    }
    // Find user given the email
    const user = UserModel.getAllUsers().find(aUser => aUser.email === body.email);
    // If not handle it
    if (!user) {
      return res.status(404).json({ status: 'error', error: 'This user email is not registered' });
    }
    // Check if the password is valid
    const isMatch = user.password === body.password;
    // If Not match, handle it
    if (!isMatch) {
      return res.status(401).json({ status: 'error', error: 'The password is incorrect.' });
    }
    const token = tokenGenerator.signToken(user);
    user.token = token;
    return res.status(201).json({ status: 'success', data: user });
  },
};
export default SignIn;

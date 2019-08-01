import UserModel from '../../models/userModel';
import tokenGenerator from '../../helpers/signToken';

const SignIn = {
  /**
  * @param {object} req
  * @param {object} res
  *@returns {object} user object
  */
  signIn(req, res) {
    const { user } = req;
    // if (!body.email || !body.password) {
    //   return res.status(400).json({ status: 'error', error: 'Bad Request! All Sign In fields are required!' });
    // }
    // eslint-disable-next-line max-len
    // const foundUser = UserModel.getAllUsers().find(user => user.email === body.email && user.password === body.password);
    if (!user) {
      return res.status(404).json({ status: 'error', error: 'Bad Credentials! User doesn\'t exist' });
    }
    console.log(`Login success: ${user.email}=>${user.password}`);
    const token = tokenGenerator.signToken(user);
    return res.status(201).json({ status: 'success', data: user, token });
  },
};
export default SignIn;

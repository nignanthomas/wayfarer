import UserModel from '../../models/userModel';

const SignIn = {
  /**
  * @param {object} req
  * @param {object} res
  *@returns {object} user object
  */
  signIn(req, res) {
    const { body } = req;
    if (!body.email || !body.password) {
      return res.status(400).json({ status: 'error', error: 'Bad Request! All Sign In fields are required!' });
    }
    // eslint-disable-next-line max-len
    const foundUser = UserModel.getAllUsers().find(user => user.email === body.email && user.password === body.password);
    if (!foundUser) {
      return res.status(404).json({ status: 'error', error: `Bad Credentials! User doesn't exist` });
    }
    return res.status(201).json({ status: 'success', data: foundUser });
  },
};
export default SignIn;

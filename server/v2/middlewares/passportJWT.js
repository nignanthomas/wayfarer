import passport from 'passport';
// eslint-disable-next-line no-unused-vars
import passportConf from '../helpers/passport';


const passportJWT = (req, res, next) => {
  // eslint-disable-next-line consistent-return
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ status: 401, error: 'Missing or Invalid Token!' });
    req.user = user;
    next();
  })(req, res, next);
};
module.exports = {
  passportJWT,
};

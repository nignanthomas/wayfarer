import { responseError } from '../helpers/responseHelpers';

const isAdmin = (req, res, next) => {
  if (!req.user.is_admin) {
    return responseError(res, 401, 'Unauthorized! Admin Only Route!');
  }
  return next();
};
module.exports = {
  isAdmin,
};

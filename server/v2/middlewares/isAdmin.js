import { responseError } from '../helpers/responseHelpers';

const isAdmin = (req, res, next) => {
  if (!req.user.is_admin) {
    return responseError(res, 400, 'Unauthorized! Only admin can create a trip!');
  }
  return next();
};
module.exports = {
  isAdmin,
};

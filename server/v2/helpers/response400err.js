import { responseError } from './responseHelpers';

const response400Error = (res, err) => responseError(res, 400, err);

module.exports = {
  response400Error,
};

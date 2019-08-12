import Joi from '@hapi/joi';
import validators from '../helpers/validators';
import { responseError } from '../helpers/responseHelpers';

const isValid = (req, res, next) => {

  const validMethods = ['post', 'patch'];
  const route = req.route.path;
  const method = req.method.toLowerCase();

  if (validMethods.includes(method) && validators[route]) {
    const schema = validators[route];

    return Joi.validate(req.body, schema, (error, data) => {
      if (error) {
        return responseError(res, 400, error.details[0].message);
      }
      req.body = data;
      return next();
    });
  }
};

export default isValid;

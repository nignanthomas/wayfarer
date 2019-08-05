import Joi from '@hapi/joi';

const validateSignup = (data) => {
  const schema = Joi.object().keys({
    email: Joi.string().trim().required(),
    first_name: Joi.string().trim().required(),
    last_name: Joi.string().trim().required(),
    password: Joi.string().trim().required(),
  });
  return Joi.validate(data, schema);
};
module.exports = {
  validateSignup,
};

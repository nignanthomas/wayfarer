import Joi from '@hapi/joi';

const validateSignin = (data) => {
  const schema = Joi.object().keys({
    email: Joi.string().trim().required(),
    password: Joi.string().trim().required(),
  });
  return Joi.validate(data, schema, { abortEarly: false });
};
module.exports = {
  validateSignin,
};

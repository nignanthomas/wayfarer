import Joi from '@hapi/joi';

const idValidator = (data) => {
  const schema = Joi.object().keys({
    id: Joi.number().integer().required(),
  });
  return Joi.validate(data, schema);
};

module.exports = {
  idValidator,
};

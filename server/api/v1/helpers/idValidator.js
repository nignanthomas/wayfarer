import Joi from '@hapi/joi';

const tripIdValidator = (data) => {
  const schema = Joi.object().keys({
    tripId: Joi.number().integer().required(),
  });
  return Joi.validate(data, schema);
};
const bookingIdValidator = (data) => {
  const schema = Joi.object().keys({
    bookingId: Joi.number().integer().required(),
  });
  return Joi.validate(data, schema);
};
module.exports = {
  tripIdValidator,
  bookingIdValidator,
};

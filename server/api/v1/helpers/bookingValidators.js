import Joi from '@hapi/joi';

const validateNewBooking = (data) => {
  const schema = Joi.object().keys({
    user_id: Joi.number().required(),
    trip_id: Joi.number().required(),
    seat_number: Joi.number().min(1).max(45).required(),
  });
  return Joi.validate(data, schema);
};
module.exports = {
  validateNewBooking,
};

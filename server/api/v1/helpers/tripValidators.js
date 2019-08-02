import Joi from '@hapi/joi';

const validateNewTrip = (data) => {
  const schema = Joi.object().keys({
    origin: Joi.string().trim().required(),
    destination: Joi.string().trim().required(),
    seating_capacity: Joi.number().required(),
    bus_license_number: Joi.string().trim().required(),
    trip_date: Joi.date().min('now').required(),
    fare: Joi.number().integer().required(),
  });
  return Joi.validate(data, schema);
};
module.exports = {
  validateNewTrip,
};

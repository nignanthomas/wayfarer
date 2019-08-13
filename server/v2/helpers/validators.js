import Joi from '@hapi/joi';

const validateSignup = Joi.object().keys({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  first_name: Joi.string().trim().required(),
  last_name: Joi.string().trim().required(),
  password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/).required().label('Password should contain at least 8 characters, lowercase and uppercse and special characters.'),
});

const validateSignin = Joi.object().keys({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().trim().required(),
});

const validateNewTrip = Joi.object().keys({
  origin: Joi.string().trim().required(),
  destination: Joi.string().trim().required(),
  seating_capacity: Joi.number().required(),
  bus_license_number: Joi.string().trim().required(),
  trip_date: Joi.date().min('now').raw().required(),
  fare: Joi.string().regex(/^[0-9]+$/).required(),
});

const validateUpdateTrip = Joi.object().keys({
  fare: Joi.number().integer(),
});

const validateNewBooking = Joi.object().keys({
  trip_id: Joi.number().required(),
  seat_number: Joi.number().min(1).max(24).required(),
});

const validateUpdateBooking = Joi.object().keys({
  seat_number: Joi.number().min(1).max(24),
});

module.exports = {
  '/auth/signup': validateSignup,
  '/auth/signin': validateSignin,
  '/trips': validateNewTrip,
  '/trips/:id': validateUpdateTrip,
  '/bookings': validateNewBooking,
  '/bookings/:id': validateUpdateBooking,
};

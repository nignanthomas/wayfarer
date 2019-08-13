import dotenv from 'dotenv';

dotenv.config();


const trip = {
  seating_capacity: 45,
  bus_license_number: 'KCK 469',
  origin: 'Kigali',
  destination: 'Nairobi',
  trip_date: '10-12-2019',
  fare: '5000',
};

const tripNoSeatCapacity = {
  bus_license_number: 'KCK 469',
  origin: 'Kigali',
  destination: 'Nairobi',
  trip_date: new Date().setDate(new Date().getDate() + 1),
  fare: 5000,
};

const tripNoLicense = {
  seating_capacity: 45,
  origin: 'Kigali',
  destination: 'Nairobi',
  trip_date: new Date().setDate(new Date().getDate() + 1),
  fare: 5000,
};

const tripNoOrigin = {
  seating_capacity: 45,
  bus_license_number: 'KCK 469',
  destination: 'Nairobi',
  trip_date: new Date().setDate(new Date().getDate() + 1),
  fare: 5000,
};

const tripNoDestination = {
  seating_capacity: 45,
  bus_license_number: 'KCK 469',
  origin: 'Kigali',
  fare: 5000,
};

const tripNoFare = {
  seating_capacity: 45,
  bus_license_number: 'KCK 469',
  origin: 'Kigali',
  destination: 'Nairobi',
  trip_date: new Date().setDate(new Date().getDate() + 1),
};

const tripUpdate = {
  seating_capacity: 45,
  bus_license_number: 'KC8 219',
  trip_date: new Date().setDate(new Date().getDate() + 1),
  fare: 7500,
};

const bookingForPost = {
  trip_id: 1,
  seat_number: 12,
};

const bookingNoTripId = {
  seat_number: 12,
};

const bookingNoSeatNumber = {
  trip_id: 1,
};

const bookingForModel = {
  trip_id: 1,
  user_id: 1,
  seat_number: 12,
};
const seatNumberUpdate = {
  seat_number: 21,
};

const user = {
  email: 'thomasnignan@gmail.com',
  first_name: 'Thomas',
  last_name: 'Nignan',
  password: 'qwPOOEJerty145%#$@',
};

const userNoEmail = {
  email: '',
  first_name: 'Thomas',
  last_name: 'Nignan',
  password: 'qwPOOEJerty145%#$@',
};

const userNoFirstName = {
  email: 'nignanthomas@gmail.com',
  first_name: '',
  last_name: 'Nignan',
  password: 'qwPOOEJerty145%#$@',
};

const userNoLastName = {
  email: 'nignanthomas@gmail.com',
  first_name: 'Thomas',
  last_name: '',
  password: 'qwPOOEJerty145%#$@',
};

const userNoPassword = {
  email: 'nignanthomas@gmail.com',
  first_name: 'Thomas',
  last_name: 'Nignan',
  password: '',
};

const adminUser = {
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD,
};

const adminSignUp = {
  email: process.env.ADMIN_EMAIL,
  first_name: 'Thanos',
  last_name: 'Inevitable',
  password: process.env.ADMIN_PASSWORD,
};

const wrongUser = {
  email: 'starlord@gmail.com',
  password: 'qwPOOEJerty145%#$@',
};

const adminWrongPass = {
  email: process.env.ADMIN_EMAIL,
  password: 'qwPOOEJerty145%#$@',
};

const loginNoEmail = {
  email: '',
  password: 'qwPOOEJerty145%#$@',
};

const loginNoPass = {
  email: 'nignanthomas@gmail.com',
  password: '',
};

const loginEmpty = {
  email: '',
  password: '',
};

module.exports = {
  trip,
  bookingForPost,
  bookingForModel,
  bookingNoTripId,
  bookingNoSeatNumber,
  seatNumberUpdate,
  user,
  userNoEmail,
  userNoFirstName,
  userNoLastName,
  userNoPassword,
  adminUser,
  adminSignUp,
  wrongUser,
  adminWrongPass,
  loginNoEmail,
  loginNoPass,
  loginEmpty,
  tripNoSeatCapacity,
  tripNoLicense,
  tripNoOrigin,
  tripNoDestination,
  tripNoFare,
  tripUpdate,
};

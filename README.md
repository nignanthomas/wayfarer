[![Build Status](https://travis-ci.org/nignanthomas/wayfarer.svg?branch=develop)](https://travis-ci.org/nignanthomas/wayfarer)
[![Coverage Status](https://coveralls.io/repos/github/nignanthomas/wayfarer/badge.svg?branch=develop)](https://coveralls.io/github/nignanthomas/wayfarer?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/8c4c61983f337376392e/maintainability)](https://codeclimate.com/github/nignanthomas/wayfarer/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/8c4c61983f337376392e/test_coverage)](https://codeclimate.com/github/nignanthomas/wayfarer/test_coverage)

# WayFarer :bus:
WayFarer is a public bus transportation booking service.

An Andela Bootcamp Challenge.

For API documentation, please visit https://wayfarer-adc-nthomas.herokuapp.com/api/v1/api-docs/

# Live Link :globe_with_meridians:
https://nignanthomas.github.io/wayfarer/UI/html

Admin route: https://nignanthomas.github.io/wayfarer/UI/html/admin/admin-bookings.html

# Features :rocket:
1. User can sign up. [Sign Up Page](https://nignanthomas.github.io/wayfarer/UI/html/signup.html)
2. User can sign in. [Sign In](https://nignanthomas.github.io/wayfarer/UI/html/signin.html)
3. Admin can create a trip. [Create Trip](https://nignanthomas.github.io/wayfarer/UI/html/admin/create-trip.html)
4. Admin can cancel a trip. [Cancel Trip](https://nignanthomas.github.io/wayfarer/UI/html/admin-booking.html)
5. Both Admin and Users can see all trips. [Admin Trips](https://nignanthomas.github.io/wayfarer/UI/html/admin-trips.html) / [User Trips](https://nignanthomas.github.io/wayfarer/UI/html/index.html)
6. Both Admin and Users can see a specific trip. [Admin Trip](https://nignanthomas.github.io/wayfarer/UI/html/admin-trip.html) / [User Trip](https://nignanthomas.github.io/wayfarer/UI/html/one-trip.html)
7. Users can book a seat on a trip. [Book Trip](https://nignanthomas.github.io/wayfarer/UI/html/one-trip.html) the click on `Book` button to choose a seat.
8. View all bookings. An Admin can see all bookings, while user can see all of his/her
bookings. [Admin Bookings](https://nignanthomas.github.io/wayfarer/UI/html/admin-bookings.html) / [User Bookings](https://nignanthomas.github.io/wayfarer/UI/html/my-trips.html)
9. Users can delete their booking. [Delete Booking](https://nignanthomas.github.io/wayfarer/UI/html/one-booking.html) then click on `Delete` button.

### Optional Features
- Users can get a list of filtered trips based on origin. [Filter Origin](https://nignanthomas.github.io/wayfarer/UI/html/index.html) then fill `From` field in the search bar to specify origin city.
- Users can get a list of filtered trips based on destination. [Filter Origin](https://nignanthomas.github.io/wayfarer/UI/html/index.html) then fill `To` field in the search bar to specify destination city.
- Users can specify their seat numbers when making a booking. [Book Trip](https://nignanthomas.github.io/wayfarer/UI/html/one-trip.html) the click on `Book` button to specify your seat.


### API Endpoints :droplet:

- #### Sign up endpoint
| Endpoint | Request Method | Request parameter |
| ---------- |----------- | ------------- |
| [/api/v1/auth/signup](https://wayfarer-adc-nthomas.herokuapp.com//api/v1/auth/signup) | POST | |

- #### Sign in endpoint
| Endpoint | Request Method | Request parameter |
| ---------- |----------- | ------------- |
| [/api/v1/auth/signin](https://wayfarer-adc-nthomas.herokuapp.com//api/v1/auth/signin) | POST | |

- #### Trips endpoint
| Endpoints | Request Method | Request parameter |
| --------- | ----------- | ------------- |
| [/api/v1/trips](https://wayfarer-adc-nthomas.herokuapp.com//api/v1/trips) | POST | Authhorization token|
| [/api/v1/trips](https://wayfarer-adc-nthomas.herokuapp.com//api/v1/trips) | GET | Authhorization token|
| [/api/v1/trips/:tripId](https://wayfarer-adc-nthomas.herokuapp.com//api/v1/trips/:tripId) | GET | tripId && Authhorization token |
| [/api/v1/trips/:tripId](https://wayfarer-adc-nthomas.herokuapp.com//api/v1/trips/:tripId) | PATCH | tripId && Authhorization token |
| [/api/v1/trips/:tripId/cancel](https://wayfarer-adc-nthomas.herokuapp.com//api/v1/trips/:tripId/cancel) | PATCH | tripId && Authhorization token |
| [/api/v1/trips/:tripId](https://wayfarer-adc-nthomas.herokuapp.com//api/v1/trips/:tripId) | DELETE | tripId && Authhorization token |

- #### Bookings endpoint
| Endpoints | Request Method | Request parameter |
| --------- | ----------- | ------------- |
| [/api/v1/bookings](https://wayfarer-adc-nthomas.herokuapp.com//api/v1/bookings) | POST | Authhorization token |
| [/api/v1/bookings](https://wayfarer-adc-nthomas.herokuapp.com//api/v1/bookings) | GET | Authhorization token |
| [/api/v1/bookings/:bookingId](https://wayfarer-adc-nthomas.herokuapp.com//api/v1/bookings/:bookingId) | GET | bookingId && Authhorization token |
| [/api/v1/bookings/:bookingId](https://wayfarer-adc-nthomas.herokuapp.com//api/v1/bookings/:bookingId) | PATCH | bookingId && Authhorization token |
| [/api/v1/bookings/:bookingId](https://wayfarer-adc-nthomas.herokuapp.com//api/v1/bookings/:bookingId) | DELETE | bookingId && Authhorization token |

# Prerequisites
- Clone this project with `git clone https://github.com/nignanthomas/wayfarer.git`.
- Head to project directory `cd wayfarer`

#### UI
 - Navigate to UI/html folder `cd UI/html`
 - These are HTML and CSS based pages that can be run directly in your browser.

#### Server
 - Install the project dependencies `npm install`
 - Launch the server `npm start`

# Technologies Stack :gear:
| Frontend-UI | Backend-API    |
| ---------   | -----------    |
| HTML        | Nodejs/Express |
| CSS         | Mocha          |
| JS          |                |


# Management :pencil:
This project is managed using [Pivotal Tracker](https://www.pivotaltracker.com/n/projects/2361810).

# Contribution Guidelines :two_men_holding_hands:
1. Explain why you're making a change.
2. Please consider the scope of your change.
3. Please modify only one template per pull request.
4. The more you can make me understand the change you're making, the more likely I'll be to accept your contribution quickly.

# Author :computer:
[Thomas Nignan](https://github.com/nignanthomas/)

# Acknowledgments :bow:
[Andela Rwanda](https://www.andela.com)

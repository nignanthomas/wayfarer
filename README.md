
[![Build Status](https://travis-ci.org/nignanthomas/wayfarer.svg?branch=develop)](https://travis-ci.org/nignanthomas/wayfarer)
[![Coverage Status](https://coveralls.io/repos/github/nignanthomas/wayfarer/badge.svg)](https://coveralls.io/github/nignanthomas/wayfarer)
[![Maintainability](https://api.codeclimate.com/v1/badges/8c4c61983f337376392e/maintainability)](https://codeclimate.com/github/nignanthomas/wayfarer/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/8c4c61983f337376392e/test_coverage)](https://codeclimate.com/github/nignanthomas/wayfarer/test_coverage)

		██╗    ██╗ █████╗ ██╗   ██╗███████╗ █████╗ ██████╗ ███████╗██████╗
		██║    ██║██╔══██╗╚██╗ ██╔╝██╔════╝██╔══██╗██╔══██╗██╔════╝██╔══██╗
		██║ █╗ ██║███████║ ╚████╔╝ █████╗  ███████║██████╔╝█████╗  ██████╔╝
		██║███╗██║██╔══██║  ╚██╔╝  ██╔══╝  ██╔══██║██╔══██╗██╔══╝  ██╔══██╗
		╚███╔███╔╝██║  ██║   ██║   ██║     ██║  ██║██║  ██║███████╗██║  ██║
		 ╚══╝╚══╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝

# WayFarer :bus:
WayFarer is a public bus transportation booking service.

An Andela Bootcamp Challenge.

For API documentation, please visit https://wayfarer-adc-nthomas.herokuapp.com/api/v1/api-docs/

# Table of Contents
* [Live Link](#live-link-globe_with_meridians)
* [Features](#features-rocket)
* [API Endpoints](#api-endpoints-droplet)
* [Technologies Stack](#technologies-stack-gear)
* [Management](#management-pencil)
* [Contributions](#contribution-guidelines-two_men_holding_hands)
* [Author](#author-computer)
* [Bugs](#bugs-bug)
* [Acknowledgments](#acknowledgments-bow)


# Live Link :globe_with_meridians:
https://nignanthomas.github.io/wayfarer/UI/html

Admin route: https://nignanthomas.github.io/wayfarer/UI/html/admin/admin-bookings.html

# Features :rocket:
1. [x] User can sign up. [Sign Up Page](https://nignanthomas.github.io/wayfarer/UI/html/signup.html)
2. [x] User can sign in. [Sign In](https://nignanthomas.github.io/wayfarer/UI/html/signin.html)
3. [x] Admin can create a trip. [Create Trip](https://nignanthomas.github.io/wayfarer/UI/html/admin/create-trip.html)
4. [x] Admin can cancel a trip. [Cancel Trip](https://nignanthomas.github.io/wayfarer/UI/html/admin-booking.html)
5. [x] Both Admin and Users can see all trips. [Admin Trips](https://nignanthomas.github.io/wayfarer/UI/html/admin-trips.html) / [User Trips](https://nignanthomas.github.io/wayfarer/UI/html/index.html)
6. [x] Both Admin and Users can see a specific trip. [Admin Trip](https://nignanthomas.github.io/wayfarer/UI/html/admin-trip.html) / [User Trip](https://nignanthomas.github.io/wayfarer/UI/html/one-trip.html)
7. [x] Users can book a seat on a trip. [Book Trip](https://nignanthomas.github.io/wayfarer/UI/html/one-trip.html) the click on `Book` button to choose a seat.
8. [x] View all bookings. An Admin can see all bookings, while user can see all of his/her bookings. [Admin Bookings](https://nignanthomas.github.io/wayfarer/UI/html/admin-bookings.html) / [User Bookings](https://nignanthomas.github.io/wayfarer/UI/html/my-trips.html)
9. [x] Users can delete their booking. [Delete Booking](https://nignanthomas.github.io/wayfarer/UI/html/one-booking.html) then click on `Delete` button.

### Optional Features :airplane:
- [x] Users can get a list of filtered trips based on origin. [Filter Origin](https://nignanthomas.github.io/wayfarer/UI/html/index.html) then fill `From` field in the search bar to specify origin city.
- [x] Users can get a list of filtered trips based on destination. [Filter Origin](https://nignanthomas.github.io/wayfarer/UI/html/index.html) then fill `To` field in the search bar to specify destination city.
- [x] Users can specify their seat numbers when making a booking. [Book Trip](https://nignanthomas.github.io/wayfarer/UI/html/one-trip.html) the click on `Book` button to specify your seat.


# API Endpoints :droplet:

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
| [/api/v1/trips/?origin=Kigali](https://wayfarer-adc-nthomas.herokuapp.com//api/v1/trips/?origin=Kigali) | GET | origin && Authhorization token|
| [/api/v1/trips/?destination=Nairobi](https://wayfarer-adc-nthomas.herokuapp.com//api/v1/trips/?destination=Nairobi) | GET | destination && Authhorization token|
| [/api/v1/trips/?origin=Kigali&destination=Nairobi](https://wayfarer-adc-nthomas.herokuapp.com//api/v1/trips/?origin=Kigali&destination=Nairobi) | GET | origin & destination && Authhorization token|
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

# Prerequisites :wrench:
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
| JS          | Travis-CI      |


# Management :pencil:
This project is managed using [Pivotal Tracker](https://www.pivotaltracker.com/n/projects/2361810).

# Contribution Guidelines :two_men_holding_hands:
1. Explain why you're making a change.
2. Please consider the scope of your change.
3. Please modify only one template per pull request.
4. The more you can make me understand the change you're making, the more likely I'll be to accept your contribution quickly.

# Bugs :bug:
No known bugs.
If you spot one, kindly email me @ nignanthomas@gmail.com

# Author :computer:
	        _                         _   _                               
	  _ __ (_) __ _ _ __   __ _ _ __ | |_| |__   ___  _ __ ___   __ _ ___
	 | '_ \| |/ _` | '_ \ / _` | '_ \| __| '_ \ / _ \| '_ ` _ \ / _` / __|
	 | | | | | (_| | | | | (_| | | | | |_| | | | (_) | | | | | | (_| \__ \
	 |_| |_|_|\__, |_| |_|\__,_|_| |_|\__|_| |_|\___/|_| |_| |_|\__,_|___/
	          |___/
[Thomas Nignan](https://github.com/nignanthomas/)

# Acknowledgments :bow:
[Andela Rwanda](https://www.andela.com)

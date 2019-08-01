import passport from 'passport';
import { ExtractJwt } from 'passport-jwt';
import UserModel from './models/userModel';

const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;

// JWT Strategy
passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: 'wayfarerauthentication',
}, async (payload, done) => {
  try {
    // Find the user specified in token
    const user = await UserModel.getOneUser(payload.sub);
    // If no user handle it
    if (!user) {
      return done(null, false);
    }
    // Else return it
    done(null, user);
  } catch (error) {
    done(error, false);
  }
}));

// Local Strategy
passport.use(new LocalStrategy({
  usernameField: 'email',
}, async (email, password, done) => {
  try {
    // Find user given the email
    const user = await UserModel.getAllUsers().find(aUser => aUser.email === email);
    // If not handle it
    if (!user) {
      return done(null, false);
    }
    // Check if the password is valid
    const isMatch = user.password === password;
    // If Not match, handle it
    if (!isMatch) {
      return done(null, false);
    }
    // Else return user
    done(null, user);
  } catch (error) {
    done(error, false);
  }
}));

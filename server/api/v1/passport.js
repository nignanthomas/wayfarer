import passport from 'passport';
import { ExtractJwt } from 'passport-jwt';
import UserModel from './models/userModel';
import { JWT_SECRET } from './config';

const JwtStrategy = require('passport-jwt').Strategy;

// JWT Strategy
passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: JWT_SECRET,
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

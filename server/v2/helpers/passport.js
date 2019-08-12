import passport from 'passport';
import dotenv from 'dotenv';
import { ExtractJwt } from 'passport-jwt';
import UserModel from '../models/userModel';

dotenv.config();

const { JWT_SECRET } = process.env;
const JwtStrategy = require('passport-jwt').Strategy;

passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromHeader('token'),
  secretOrKey: JWT_SECRET,
}, async (payload, done) => {
  try {
    const user = await UserModel.getOneUser(payload.sub);
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
}));

import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const { JWT_SECRET } = process.env;


const signToken = (user) => {
  return JWT.sign({
    iss: 'wayFarer',
    sub: user.id,
    iat: new Date().getTime(), // current time
    exp: new Date().setDate(new Date().getDate() + 1), // current time + 1 day
  }, JWT_SECRET);
};
module.exports = {
  signToken,
};

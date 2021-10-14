import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import fs from 'fs';
import { getRepository } from 'typeorm';
import User from '../entity/User';

const PUB_KEY = fs.readFileSync(`${__dirname}/../../jwt_RS256_key_pub.pem`, 'utf8');

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ['RS256'],
};

passport.use(new JwtStrategy(jwtOptions, async (jwtPayload, done) => {

  let user: User | undefined;
  try {
    const userRepository = getRepository(User);
    user = await userRepository.findOne(jwtPayload.sub);
  } catch (e) {
    // ...
  }

  if (user) {
    return done(null, user);
  }
  return done(null, false);
}));

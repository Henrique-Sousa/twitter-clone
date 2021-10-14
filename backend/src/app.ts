import 'reflect-metadata';
import express from 'express';
import createError from 'http-errors';
import { getRepository, createConnection } from 'typeorm';
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import fs from 'fs';
import User from './entity/User';
import usersRouter from './routes/users';
import tweetsRouter from './routes/tweets';

type Request = express.Request;
type Response = express.Response;
type NextFunction = express.NextFunction;
type HttpError = createError.HttpError;

createConnection();

const app = express();

const PUB_KEY = fs.readFileSync(`${__dirname}/../../jwt_RS256_key.pem`, 'utf8');

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

app.use(passport.initialize());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.all('*', (_req: Request, res: Response, next: NextFunction): void => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use('/users', usersRouter);
app.use('/tweets', tweetsRouter);

app.get('/protected', passport.authenticate('jwt', { session: false }), (_req, res, _next) => {
  res.status(200);
  res.send({ success: true, msg: 'You are successfully authenticated to this route!' });
});

app.use((_req: Request, _res: Response, next: NextFunction): void => {
  next(createError(404));
});

app.use((err: HttpError, _req: Request, res: Response, _next: NextFunction): void => {
  res.status(err.status || 500);
  res.end();
});

app.listen(3001);

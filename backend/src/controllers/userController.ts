import createError from 'http-errors';
import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import fs from 'fs';
import User from '../entity/User';
import { controllerFunction } from './functions';

export const getAllUsers: controllerFunction = async (req, res, next) => {

  try {
    const userRepository = getRepository(User);
    if (req.query.skip) {
      const [users, _]: [Array<User>, number] = await userRepository.findAndCount({
        skip: Number.parseInt(req.query.skip as string, 10),
        take: 10,
      });
      res.send(users);
    } else {
      res.send('The `skip` query parameter can not be empty');
    }
  } catch (e) {
    next(createError(500));
  }
};

export const getUserById: controllerFunction = async (req, res, next) => {

  let user: User | undefined;

  const { id } = req.params;

  if (!/^[0-9]{1,19}$/.test(id)) {
    res.status(400);
    res.send({
      error: {
        title: 'Invalid Request',
        detail: `The \`id\` query parameter value [${id}] does not match ^[0-9]{1,19}$`,
        id: `${id}`,
      },
    });
  }

  try {
    const userRepository = getRepository(User);
    user = await userRepository.findOne(id);

    if (user) {
      res.send(user);
    } else {
      res.send({
        error: {
          title: 'Not Found Error',
          detail: `Could not find user with id: [${id}].`,
          resource_type: 'user',
          resource_id: id,
          parameter: 'id',
        },
      });
    }
  } catch (e) {
    next(createError(500));
  }

};

export const getUserByUsername: controllerFunction = async (req, res, next) => {

  let user: User | undefined;

  const { username } = req.params;

  if (!/^[A-Za-z0-9_]{1,15}$/.test(username)) {
    res.status(400);
    res.send({
      error: {
        title: 'Invalid Request',
        detail: `The \`username\` query parameter value [${username}] does not match ^[A-Za-z0-9_]{1,15}$`,
        username: `${username}`,
      },
    });
  }

  try {
    const userRepository = getRepository(User);
    user = await userRepository.findOne({
      where: { username },
    });

    if (user) {
      res.send(user);
    } else {
      res.send({
        error: {
          title: 'Not Found Error',
          detail: `Could not find user with username: [${username}].`,
          resource_type: 'user',
          resource_id: username,
          parameter: 'username',
        },
      });
    }
  } catch (e) {
    next(createError(500));
  }
};

export const createUser: controllerFunction = async (req, res, next) => {

  const userRepository = getRepository(User);

  const userOnDatabase: User | undefined = await userRepository.findOne({
    where: { username: req.body.username },
  });

  if (userOnDatabase) {
    res.status(403);
    res.send({
      error: {
        title: 'Already Exists',
        detail: `A user with username: [${req.body.username}] already exists.`,
        resource_type: 'user',
        resource_id: req.body.username,
        parameter: 'username',
      },
    });
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = {
    name: req.body.name,
    username: req.body.username,
    password: hashedPassword,
  };

  try {
    await userRepository.insert(user);
    res.end();
  } catch (e) {
    next(createError(500));
  }
};

export const logUserIn: controllerFunction = async (req, res, next) => {

  let user: User | undefined;
  const { username, password } = req.body;

  try {
    const userRepository = getRepository(User);
    user = await userRepository.findOne({
      select: ['id', 'username', 'password'],
      where: { username },
    });

    if (!user) {
      res.status(401);
      res.send({
        success: false,
        error: {
          title: 'Not Found Error',
          detail: `Could not find user with username: [${username}].`,
        },
      });
    } else {
      const result = await bcrypt.compare(password, user.password);

      if (result) {
        const { id } = user;
        const expiresIn = '1d';

        const payload = {
          sub: id,
          iat: Date.now(),
        };

        const PRIV_KEY = fs.readFileSync(`${__dirname}/../../jwt_RS256_key_pub.pem`, 'utf8');
        const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, { expiresIn, algorithm: 'RS256' });

        res.send({
          success: true,
          token: `Bearer ${signedToken}`,
          expires: expiresIn,
        });
      }

      res.status(401);
      res.send({
        success: false,
        error: {
          title: 'Wrong Password Error',
          detail: 'You entered the wrong password',
        },
      });
    }
  } catch (e) {
    next(createError(500));
  }
};

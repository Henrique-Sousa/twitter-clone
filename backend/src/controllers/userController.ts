import createError from 'http-errors';
import { getRepository } from 'typeorm';
import User from '../entity/User';
import { controllerFunction } from './functions';

export const getAllUsers: controllerFunction = async (_req, res, next) => {

  let users: Array<User>;

  try {
    const userRepository = getRepository(User);
    users = await userRepository.find();
    res.send(users);
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
        detail: `The \`username\` query parameter value [${req.params.username}] does not match ^[A-Za-z0-9_]{1,15}$`,
        username: `${username}`,
      },
    });
  }

  try {
    const userRepository = getRepository(User);
    user = await userRepository.findOne({
      where: { username: req.params.username },
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

import createError from 'http-errors';
import { getRepository } from 'typeorm';
import User from '../entity/User';
import { controllerFunction } from './functions';

const getAllUsers: controllerFunction = async (_req, res, next) => {
  try {
    const userRepository = getRepository(User);
    const users = await userRepository.find();
    res.send(users);
  } catch (e) {
    next(createError(500));
  }
};

const getUserById: controllerFunction = async (req, res, next) => {

  let user: User | undefined;

  const { id } = req.params;

  if (!/^[0-9]{1,19}$/.test(id)) {
    res.status(400);
    res.send({
      error: 'Invalid Request',
      message: `The \`id\` query parameter value [${req.params.id}] does not match ^[0-9]{1,19}$`,
      resource: 'user',
      id,
    });
  }

  const nid = Number.parseInt(id, 10);

  try {
    const userRepository = getRepository(User);
    user = await userRepository.findOne(id);

    if (user) {
      res.send(user);
    } else {
      res.status(200);
      res.send({
        error: 'Not Found',
        resource: 'user',
        id: nid,
      });
    }
  } catch (e) {
    next(createError(500));
  }

};

const getUserByUsername: controllerFunction = async (req, res, next) => {

  let user: User | undefined;

  try {
    const userRepository = getRepository(User);
    user = await userRepository.findOne({
      where: { username: req.params.username },
    });

    if (user) {
      res.send(user);
    } else {
      res.send({
        error: 'Not Found',
        resource: 'user',
        username: req.params.username,
      });
    }
  } catch (e) {
    next(createError(500));
  }

};

export default
{
  getAllUsers,
  getUserById,
  getUserByUsername,
};

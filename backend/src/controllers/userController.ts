import createError from 'http-errors';
import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import User from '../entity/User';

const index = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userRepository = getRepository(User);
    const users = await userRepository.find();
    res.send(users);
  } catch (e) {
    next(createError(500));
  }
};

const show = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  let user;

  try {
    const userRepository = getRepository(User);
    user = await userRepository.findOne(req.params.user_id);
  } catch (e) {
    next(createError(500));
  }

  if (user) {
    res.send(user);
  } else {
    res.send({
      error: 'Not Found',
      resource: 'user',
      id: req.params.user_id,
    });
  }
};

export default { index, show };

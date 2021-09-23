import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import User from '../entity/User';

const index = async (req: Request, res: Response): Promise<void> => {
  const userRepository = getRepository(User);
  const users = await userRepository.find();
  res.send(users);
};

const show = async (req: Request, res: Response): Promise<void> => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne(req.params.userId);
  res.send(user);
};

export { index, show };

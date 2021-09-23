import { Request, Response } from 'express';
import User from '../entity/User';

const index = async (req: Request, res: Response): Promise<void> => {
  const userRepository = req.app.locals.connection.getRepository(User);
  const results = await userRepository.find();
  res.send(results);
};

const show = async (req: Request, res: Response): Promise<void> => {
  const userRepository = req.app.locals.connection.getRepository(User);
  const result = await userRepository.findOne(req.params.userId);
  res.send(result);
};

export { index, show };

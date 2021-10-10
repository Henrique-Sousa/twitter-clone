import createError from 'http-errors';
import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import Tweet from '../entity/Tweet';
import User from '../entity/User';

const index = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const tweetRepository = getRepository(Tweet);
    const tweets = await tweetRepository.find({
      relations: ['user'],
      order: {
        createdAt: 'DESC',
      },
    });
    res.send(tweets);
  } catch (e) {
    next(createError(500));
  }
};

const show = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  let tweet;

  try {
    const tweetRepository = getRepository(Tweet);
    tweet = await tweetRepository.findOne(req.params.tweet_id, {
      relations: ['user'],
    });

    if (tweet) {
      res.send(tweet);
    } else {
      res.send({
        error: 'Not Found',
        resource: 'tweet',
        id: req.params.tweet_id,
      });
    }
  } catch (e) {
    next(createError(500));
  }

};

const create = async (req: Request, res: Response): Promise<void> => {
  const userRepository = getRepository(User);
  const tweetRepository = getRepository(Tweet);
  const user = await userRepository.findOne({
    where: { id: req.body.authorId },
  });

  if (user) {
    const currentUser = {
      id: user.id,
      name: user.name,
      username: user.username,
      createdAt: user.createdAt,
    };
    const tweetToSend = {
      user: currentUser,
      text: req.body.text,
    };
    await tweetRepository.insert(tweetToSend);
    res.end();
  }
};

// const destroy = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//   try {
//     await Tweet.destroy({
//       where: { id: req.params.tweet_id },
//     });
//     res.end();
//   } catch (e) {
//     next(createError(500));
//   }
// };

export default {
  index,
  show,
  create,
//   destroy,
};

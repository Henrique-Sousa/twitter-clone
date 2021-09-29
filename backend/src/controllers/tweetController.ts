import createError from 'http-errors';
import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import Tweet from '../entity/Tweet';

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
  } catch (e) {
    next(createError(500));
  }

  if (tweet) {
    res.send(tweet);
  } else {
    res.send({
      error: 'Not Found',
      resource: 'tweet',
      id: req.params.tweet_id,
    });
  }
};

// const create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//   try {
//     const tweet = await Tweet.create({
//       author: req.body.author,
//       date: Date.now(),
//       text: req.body.text,
//     });
//     res.send(tweet);
//   } catch (e) {
//     next(createError(500));
//   }
// };
//
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
//   create,
//   update,
//   destroy,
};

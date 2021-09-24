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
// const show = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//   try {
//     const result = await Tweet.findByPk(req.params.tweet_id);
//     res.send(result);
//   } catch (e) {
//     next(createError(500));
//   }
// };
//
// const update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//   try {
//     const result = await Tweet.update(
//       { text: req.body.text },
//       { where: { id: req.params.tweet_id } },
//     );
//     res.send(result);
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

export {
  index,
//  create,
//   show,
//   update,
//   destroy,
};

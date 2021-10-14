import createError from 'http-errors';
import { getRepository } from 'typeorm';
import Tweet from '../entity/Tweet';
import User from '../entity/User';
import { controllerFunction } from './functions';

export const getAllTweets: controllerFunction = async (_req, res, next) => {

  let tweets: Array<Tweet>;

  try {
    const tweetRepository = getRepository(Tweet);
    tweets = await tweetRepository.find({
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

export const getTweetById: controllerFunction = async (req, res, next) => {

  let tweet: Tweet | undefined;

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
    const tweetRepository = getRepository(Tweet);
    tweet = await tweetRepository.findOne(req.params.id, {
      relations: ['user'],
    });

    if (tweet) {
      res.send(tweet);
    } else {
      res.send({
        error: {
          title: 'Not Found Error',
          detail: `Could not find tweet with id: [${id}].`,
          resource_type: 'tweet',
          resource_id: id,
          parameter: 'id',
        },
      });
    }
  } catch (e) {
    next(createError(500));
  }

};

export const createTweet: controllerFunction = async (req, res, next) => {

  let userOnDatabase: User | undefined;

  try {
    const userRepository = getRepository(User);
    const tweetRepository = getRepository(Tweet);

    if (req.user) {
      const loggedUser = req.user as User;
      userOnDatabase = await userRepository.findOne({
        where: { id: loggedUser.id },
      });
    }

    if (userOnDatabase) {
      const tweet = {
        user: userOnDatabase,
        text: req.body.text,
      };
      await tweetRepository.insert(tweet);
      res.end();
    }
  } catch (e) {
    next(createError(500));
  }
};

// const destroy = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//   try {
//     await Tweet.destroy({
//       where: { id: req.params.id },
//     });
//     res.end();
//   } catch (e) {
//     next(createError(500));
//   }
// };

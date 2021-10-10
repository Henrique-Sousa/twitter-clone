import createError from 'http-errors';
import { getRepository } from 'typeorm';
import Tweet from '../entity/Tweet';
import User from '../entity/User';
import { controllerFunction } from './functions';

export const getAllTweets: controllerFunction = async (req, res, next) => {
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
//       where: { id: req.params.id },
//     });
//     res.end();
//   } catch (e) {
//     next(createError(500));
//   }
// };

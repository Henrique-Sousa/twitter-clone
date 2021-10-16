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
          resourceType: 'tweet',
          resourceId: id,
          parameter: 'id',
        },
      });
    }
  } catch (e) {
    next(createError(500));
  }

};

export const createTweet: controllerFunction = async (req, res, next) => {

  try {
    const tweetRepository = getRepository(Tweet);

    if (req.user) {
      const tweet = {
        user: req.user,
        text: req.body.text,
      };
      const result = await tweetRepository.insert(tweet);
      const newTweet: Tweet = {
        id: result.generatedMaps[0].id,
        text: req.body.text,
        createdAt: result.generatedMaps[0].createdAt,
        user: req.user as User,
      };
      res.send(newTweet);
    }
  } catch (e) {
    next(createError(500));
  }
};

export const deleteTweet: controllerFunction = async (req, res, next) => {

  let tweet: Tweet | undefined;
  const tweetId = req.params.id;

  try {
    const tweetRepository = getRepository(Tweet);
    tweet = await tweetRepository.findOne(tweetId, {
      relations: ['user'],
    });

    if (req.user && tweet) {
      const userOnDatabase = req.user as User;
      if (tweet.user.id === userOnDatabase.id) {
        await tweetRepository.delete(tweetId);
        res.end();
      } else {
        res.send('Unauthorized');
      }
    }
  } catch (e) {
    next(createError(500));
  }
};

const createError = require('http-errors');
const Tweet = require('../models/tweet');

exports.index = async (req, res, next) => {
  try {
    const results = await Tweet.findAll();
    res.send(results);
  } catch (e) {
    next(createError(500));
  }
};

exports.create = async (req, res, next) => {
  try {
    const tweet = await Tweet.create({
      author: req.body.author,
      date: Date.now(),
      text: req.body.text,
    });
    res.send(tweet);
  } catch (e) {
    next(createError(500));
  }
};

exports.show = async (req, res, next) => {
  try {
    const result = await Tweet.findByPk(req.params.tweet_id);
    res.send(result);
  } catch (e) {
    next(createError(500));
  }
};

exports.update = async (req, res, next) => {
  try {
    const result = await Tweet.update(
      { text: req.body.text },
      { where: { id: req.params.tweet_id } },
    );
    res.send(result);
  } catch (e) {
    next(createError(500));
  }
};

exports.destroy = async (req, res, next) => {
  try {
    await Tweet.destroy({
      where: { id: req.params.tweet_id },
    });
    res.end();
  } catch (e) {
    next(createError(500));
  }
};

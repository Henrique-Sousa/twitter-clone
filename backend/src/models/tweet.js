const { DataTypes } = require('sequelize');
const { sequelize, DISABLE_SEQUELIZE_DEFAULTS } = require('../database');

const Tweet = sequelize.define('tweet', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  author: { type: DataTypes.INTEGER },
  date: { type: DataTypes.DATE },
  text: { type: DataTypes.TEXT },
}, DISABLE_SEQUELIZE_DEFAULTS);

Tweet.sync();

module.exports = Tweet;

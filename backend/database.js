const Sequelize = require('sequelize');

const connection = require('./connection.json');

const DISABLE_SEQUELIZE_DEFAULTS = {
  timestamps: false,
  freezeTableName: true,
};

const sequelize = new Sequelize({
  database: connection.database,
  username: connection.user,
  host: connection.host,
  port: connection.port,
  password: connection.password,
  dialect: 'mysql',
  operatorsAliases: false
});

module.exports = { sequelize, DISABLE_SEQUELIZE_DEFAULTS }

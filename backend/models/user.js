const { DataTypes } = require('sequelize');
const { sequelize, DISABLE_SEQUELIZE_DEFAULTS } = require('../database');

const User = sequelize.define('user', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING },
	nickname: { type: DataTypes.STRING }
}, DISABLE_SEQUELIZE_DEFAULTS);

User.sync();

module.exports = User

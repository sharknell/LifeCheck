const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Mood = sequelize.define('Mood', {
  mood: {
    type: DataTypes.STRING,
    allowNull: false
  },
  note: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  date: {
    type: DataTypes.DATEONLY,
    defaultValue: DataTypes.NOW
  }
});

User.hasMany(Mood, { foreignKey: 'userId' });
Mood.belongsTo(User, { foreignKey: 'userId' });

module.exports = Mood;

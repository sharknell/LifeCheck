const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const MoodLog = sequelize.define('MoodLog', {
  mood: {
    type: DataTypes.ENUM('😄', '🙂', '😐', '😢', '😡'),
    allowNull: false
  },
  note: {
    type: DataTypes.STRING,
    allowNull: true
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  }
});

User.hasMany(MoodLog, { foreignKey: 'userId' });
MoodLog.belongsTo(User, { foreignKey: 'userId' });

module.exports = MoodLog;

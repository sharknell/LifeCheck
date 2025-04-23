const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Todo = sequelize.define('Todo', {
  content: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isDone: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: true
  }
});

User.hasMany(Todo, { foreignKey: 'userId' });
Todo.belongsTo(User, { foreignKey: 'userId' });

module.exports = Todo;

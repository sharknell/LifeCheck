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
}, {
  timestamps: true  // ✅ 이 옵션을 추가하면 createdAt이 자동 생성됨
});


User.hasMany(Todo, { foreignKey: 'userId' });
Todo.belongsTo(User, { foreignKey: 'userId' });

module.exports = Todo;

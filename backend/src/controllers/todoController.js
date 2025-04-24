const Todo = require('../models/Todo');

exports.getTodos = async (req, res) => {
  const todos = await Todo.findAll({ where: { userId: req.user.userId }, order: [['createdAt', 'DESC']] });
  res.json(todos);
};

exports.addTodo = async (req, res) => {
  const { content } = req.body;
  if (!content) return res.status(400).json({ message: '내용을 입력해주세요.' });

  const todo = await Todo.create({
    content,
    userId: req.user.userId
  });

  res.status(201).json(todo);
};

exports.toggleTodo = async (req, res) => {
  const todo = await Todo.findByPk(req.params.id);
  if (!todo || todo.userId !== req.user.userId) return res.status(404).json({ message: 'Todo를 찾을 수 없습니다.' });

  todo.isDone = !todo.isDone;
  await todo.save();
  res.json(todo);
};

exports.deleteTodo = async (req, res) => {
  const todo = await Todo.findByPk(req.params.id);
  if (!todo || todo.userId !== req.user.userId) return res.status(404).json({ message: 'Todo를 찾을 수 없습니다.' });

  await todo.destroy();
  res.json({ message: '삭제 완료' });
};
// 예시: todoController.js
exports.updateTodo = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  try {
    const todo = await Todo.findByPk(id);
    if (!todo) return res.status(404).json({ message: '투두 없음' });

    todo.content = content;
    await todo.save();

    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: '수정 실패' });
  }
};


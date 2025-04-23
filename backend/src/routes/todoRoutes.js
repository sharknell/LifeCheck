const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const todoController = require('../controllers/todoController');

router.get('/', authMiddleware, todoController.getTodos);
router.post('/', authMiddleware, todoController.addTodo);
router.put('/:id/toggle', authMiddleware, todoController.toggleTodo);
router.delete('/:id', authMiddleware, todoController.deleteTodo);

module.exports = router;

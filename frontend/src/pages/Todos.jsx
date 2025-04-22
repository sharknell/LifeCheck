import React, { useEffect, useState } from 'react';
import API from '../services/api';
import TodoItem from '../components/todo/TodoItem';
import TodoForm from '../components/todo/TodoForm';

const Todos = () => {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    try {
      const res = await API.get('/todos');
      setTodos(res.data);
    } catch (err) {
      console.error('❌ 투두 불러오기 실패', err);
    }
  };

  const handleAdd = async (content) => {
    try {
      const res = await API.post('/todos', { content });
      setTodos([res.data, ...todos]);
    } catch (err) {
      console.error('❌ 추가 실패', err);
    }
  };

  const handleToggle = async (id) => {
    try {
      const res = await API.put(`/todos/${id}/toggle`);
      setTodos(todos.map(todo => todo.id === id ? res.data : todo));
    } catch (err) {
      console.error('❌ 토글 실패', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/todos/${id}`);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (err) {
      console.error('❌ 삭제 실패', err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h2>📝 나의 할 일</h2>
      <TodoForm onAdd={handleAdd} />
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={() => handleToggle(todo.id)}
            onDelete={() => handleDelete(todo.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default Todos;

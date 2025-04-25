import React, { useEffect, useState } from 'react';
import API from '../../services/api';

const TodoCompletionMessage = () => {
  const [todos, setTodos] = useState([]);
  const [message, setMessage] = useState('');
  const today = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await API.get('/todos');
        const todayTodos = res.data.filter(todo => todo.date === today);
        setTodos(todayTodos);
      } catch (err) {
        console.error('투두 불러오기 실패', err);
      }
    };

    fetchTodos();
  }, [today]);

  useEffect(() => {
    if (todos.length === 0) {
      setMessage('오늘의 할 일이 없어요!');
      return;
    }

    const completed = todos.filter(todo => todo.isDone).length;
    const rate = (completed / todos.length) * 100;

    if (rate === 100) {
      setMessage('🎉 완벽해요! 오늘의 모든 할 일을 완료했어요!');
    } else if (rate >= 70) {
      setMessage('👍 훌륭해요! 대부분의 할 일을 완료했어요!');
    } else if (rate >= 30) {
      setMessage('🙂 괜찮아요! 더 노력해봐요!');
    } else {
      setMessage('💪 힘내요! 아직 할 일이 많이 남았어요!');
    }
  }, [todos]);

  return (
    <div>
      <h3>{message}</h3>
    </div>
  );
};

export default TodoCompletionMessage;

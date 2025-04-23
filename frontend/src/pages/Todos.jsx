import React, { useEffect, useState } from 'react';
import API from '../services/api';
import TodoForm from '../components/todo/TodoForm';
import TodoItem from '../components/todo/TodoItem';
import MoodForm from '../components/mood/MoodForm';
import MoodChart from '../components/mood/MoodChart';
import MoodHistory from '../components/mood/MoodHistory';
import MoodWeeklyChart from '../components/mood/MoodWeeklyChart';
import TodoStats from '../components/todo/TodoStats';

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [moods, setMoods] = useState([]);

  const latestMood = moods[moods.length - 1]?.mood || null;

  const getTodayString = () => {
    const today = new Date();
    return today.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'short',
    });
  };

  const fetchTodos = async () => {
    try {
      const res = await API.get('/todos');
      setTodos(res.data);
    } catch (err) {
      console.error('❌ 투두 불러오기 실패', err);
    }
  };

  const fetchMoods = async () => {
    try {
      const res = await API.get('/moods');
      setMoods(res.data);
    } catch (err) {
      console.error('❌ 감정 불러오기 실패', err);
    }
  };

  const handleAddTodo = async (todoData) => {
    try {
      const res = await API.post('/todos', todoData); // 객체 전달
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

  const handleAddMood = (log) => {
    setMoods(prev => [...prev, log]);
  };

  useEffect(() => {
    fetchTodos();
    fetchMoods();
  }, []);

  const getMoodColor = (mood) => {
    switch (mood) {
      case '😄': return '#fff9c4';
      case '🙂': return '#d0f0c0';
      case '😐': return '#f0f0f0';
      case '😢': return '#bbdefb';
      case '😡': return '#ffcdd2';
      default: return 'white';
    }
  };

  return (
    <div style={{
      maxWidth: 600,
      margin: 'auto',
      padding: 20,
      backgroundColor: getMoodColor(latestMood),
      transition: 'background-color 0.5s'
    }}>
      <h2>🗓️ {getTodayString()}</h2>
      <h2>📝 오늘의 할 일</h2>
      <TodoForm onAdd={handleAddTodo} />
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

      <hr style={{ margin: '30px 0' }} />

      <h2>😊 오늘의 감정</h2>
      <MoodForm onAdd={handleAddMood} existingLogs={moods} />

      <h2>📊 감정 차트</h2>
      <MoodChart logs={moods} />

      <h2>📜 그동안 감정 기록</h2>
      <MoodHistory logs={moods} />


      <MoodWeeklyChart logs={moods} />


      <TodoStats todos={todos} />

    </div>
  );
};

export default Todos;

import React, { useState } from 'react';

const TodoForm = ({ onAdd }) => {
  const [content, setContent] = useState('');
  const [priority, setPriority] = useState('보통');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('일반');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    const todoData = {
      content,
      priority,
      dueDate
    };

    onAdd(todoData); // 객체로 전달!
    setContent('');
    setPriority('보통');
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <input
        type="text"
        placeholder="할 일을 입력하세요"
        value={content}
        onChange={e => setContent(e.target.value)}
        style={{ padding: 10, width: '100%', marginBottom: 10 }}
      />

      <div style={{ display: 'flex', gap: '10px', marginBottom: 10 }}>
        <select value={priority} onChange={e => setPriority(e.target.value)}>
          <option value="높음">🔴 중요</option>
          <option value="보통">🟡 보통</option>
          <option value="낮음">🟢 낮음</option>
        </select>

        <select value={category} onChange={e => setCategory(e.target.value)}>
  <option value="일반">📌 일반</option>
  <option value="공부">📘 공부</option>
  <option value="운동">🏋️ 운동</option>
  <option value="업무">💼 업무</option>
  <option value="취미">🎨 취미</option>
</select>

        <input
          type="date"
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
        />
      </div>

      <button type="submit" style={{ padding: 10 }}>추가</button>
    </form>
  );
};

export default TodoForm;

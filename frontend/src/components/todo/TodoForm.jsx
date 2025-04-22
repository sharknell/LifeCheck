import React, { useState } from 'react';

const TodoForm = ({ onAdd }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    onAdd(content);
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <input
        type="text"
        placeholder="할 일을 입력하세요"
        value={content}
        onChange={e => setContent(e.target.value)}
        style={{ padding: 10, width: '80%' }}
      />
      <button type="submit" style={{ padding: 10 }}>추가</button>
    </form>
  );
};

export default TodoForm;

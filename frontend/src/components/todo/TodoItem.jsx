import React, { useState } from 'react';
import API from '../../services/api';

const formatTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

const getPriorityColor = (priority) => {
  switch (priority) {
    case '높음': return '#ef9a9a';
    case '보통': return '#fff59d';
    case '낮음': return '#a5d6a7';
    default: return '#e0e0e0';
  }
};

const TodoItem = ({ todo, onToggle, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.content);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleEditChange = (e) => {
    setEditValue(e.target.value);
  };

  const handleEditSubmit = async (e) => {
    if (e.key === 'Enter' && editValue.trim()) {
      try {
        const res = await API.patch(`/todos/${todo.id}`, { content: editValue });
        onUpdate(res.data); // 부모에게 업데이트 전달
        setIsEditing(false);
      } catch (err) {
        console.error('❌ 수정 실패', err);
      }
    }
  };

  return (
    <li style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 8,
      backgroundColor: '#f9f9f9',
      borderBottom: '1px solid #eee'
    }}>
      <div onDoubleClick={handleDoubleClick} style={{ flex: 1 }}>
        {isEditing ? (
          <input
            value={editValue}
            onChange={handleEditChange}
            onKeyDown={handleEditSubmit}
            autoFocus
            style={{ width: '100%', padding: 5 }}
          />
        ) : (
          <span
            onClick={onToggle}
            style={{
              textDecoration: todo.isDone ? 'line-through' : 'none',
              color: todo.isDone ? '#aaa' : '#333',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            {todo.content}
          </span>
        )}
        <span
          style={{
            backgroundColor: getPriorityColor(todo.priority),
            borderRadius: 4,
            padding: '2px 6px',
            fontSize: 12,
            marginLeft: 8
          }}
        >
          {todo.priority}
        </span>
        <span style={{
  backgroundColor: '#ddd',
  borderRadius: '6px',
  padding: '2px 8px',
  fontSize: 12,
  marginLeft: 10
}}>
  {todo.category}
</span>

        {todo.dueDate && (
          <small style={{ fontSize: 12, color: '#555', marginLeft: 10 }}>
            ⏰ {todo.dueDate}
          </small>
        )}
      </div>

      <small style={{ marginLeft: 10, fontSize: 12, color: '#999' }}>
        {formatTime(todo.createdAt)}
      </small>
      <button onClick={onDelete} style={{ marginLeft: 10 }}>삭제</button>
    </li>
  );
};

export default TodoItem;

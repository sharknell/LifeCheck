import React, { useState } from 'react';

const formatTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

const TodoItem = ({ todo, onToggle, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.content);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleEditChange = (e) => {
    setEditValue(e.target.value);
  };

  const handleEditSubmit = (e) => {
    if (e.key === 'Enter') {
      // 실제 업데이트 기능은 백엔드 연동 필요 (현재는 표시만)
      todo.content = editValue;
      setIsEditing(false);
    }
  };

  // 추가 함수
const getPriorityColor = (priority) => {
  switch (priority) {
    case '높음': return '#ef9a9a';
    case '보통': return '#fff59d';
    case '낮음': return '#a5d6a7';
    default: return '#e0e0e0';
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

{todo.dueDate && (
  <small style={{ fontSize: 12, color: '#555', marginLeft: 10 }}>
    ⏰ {todo.dueDate}
  </small>
)}

            {todo.content}
          </span>
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

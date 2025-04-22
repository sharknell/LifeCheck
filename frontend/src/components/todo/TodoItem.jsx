import React from 'react';

const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <li style={{ display: 'flex', justifyContent: 'space-between', padding: 8 }}>
      <span
        onClick={onToggle}
        style={{
          textDecoration: todo.isDone ? 'line-through' : 'none',
          cursor: 'pointer'
        }}
      >
        {todo.content}
      </span>
      <button onClick={onDelete} style={{ marginLeft: 10 }}>삭제</button>
    </li>
  );
};

export default TodoItem;

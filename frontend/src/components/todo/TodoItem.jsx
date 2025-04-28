import React, { useState } from "react";
import API from "../../services/api";
import "../../styles/TodoItem.css"; // ✅ 스타일 추가

const formatTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getPriorityColor = (priority) => {
  switch (priority) {
    case "높음":
      return "#ef9a9a";
    case "보통":
      return "#fff59d";
    case "낮음":
      return "#a5d6a7";
    default:
      return "#e0e0e0";
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
    if (e.key === "Enter" && editValue.trim()) {
      try {
        const res = await API.patch(`/todos/${todo.id}`, {
          content: editValue,
        });
        onUpdate(res.data);
        setIsEditing(false);
      } catch (err) {
        console.error("❌ 수정 실패", err);
      }
    }
  };

  return (
    <li className="todo-item">
      <div onDoubleClick={handleDoubleClick} className="todo-item-content">
        {isEditing ? (
          <input
            className="todo-edit-input"
            value={editValue}
            onChange={handleEditChange}
            onKeyDown={handleEditSubmit}
            autoFocus
          />
        ) : (
          <span
            onClick={onToggle}
            className={`todo-text ${todo.isDone ? "done" : ""}`}
          >
            {todo.content}
          </span>
        )}

        <span
          className="todo-priority"
          style={{ backgroundColor: getPriorityColor(todo.priority) }}
        >
          {todo.priority}
        </span>
        <span className="todo-category">{todo.category}</span>

        {todo.dueDate && (
          <small className="todo-due-date">⏰ {todo.dueDate}</small>
        )}
      </div>

      <div className="todo-item-right">
        <small className="todo-created-time">
          {formatTime(todo.createdAt)}
        </small>
        <button className="todo-delete-btn" onClick={onDelete}>
          삭제
        </button>
      </div>
    </li>
  );
};

export default TodoItem;

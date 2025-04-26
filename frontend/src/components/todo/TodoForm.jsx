import React, { useState } from "react";
import "../../styles/TodoForm.css"; // ✅ CSS 적용

const TodoForm = ({ onAdd }) => {
  const [content, setContent] = useState("");
  const [priority, setPriority] = useState("보통");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("일반");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    const todoData = {
      content,
      priority,
      dueDate,
      category, // ✅ 카테고리도 넣기
      createdAt: new Date().toISOString(),
    };

    onAdd(todoData);
    setContent("");
    setPriority("보통");
    setDueDate("");
    setCategory("일반");
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        className="todo-input"
        type="text"
        placeholder="할 일을 입력하세요 ✏️"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <div className="todo-options">
        <select
          className="todo-select"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="높음">🔴 중요</option>
          <option value="보통">🟡 보통</option>
          <option value="낮음">🟢 낮음</option>
        </select>

        <select
          className="todo-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="일반">📌 일반</option>
          <option value="공부">📘 공부</option>
          <option value="운동">🏋️ 운동</option>
          <option value="업무">💼 업무</option>
          <option value="취미">🎨 취미</option>
        </select>

        <input
          className="todo-date"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      <button className="todo-add-btn" type="submit">
        추가
      </button>
    </form>
  );
};

export default TodoForm;

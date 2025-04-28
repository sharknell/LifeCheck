import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/CalendarView.css";
const CalendarView = ({ moods, todos }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = ("0" + (d.getMonth() + 1)).slice(-2);
    const day = ("0" + d.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  };

  const filteredMoods = moods.filter(
    (mood) => formatDate(mood.date) === formatDate(selectedDate)
  );

  const filteredTodos = todos.filter(
    (todo) =>
      formatDate(todo.createdAt || todo.date) === formatDate(selectedDate)
  );

  return (
    <div className="calendar-view">
      <h2>📅 감정 및 할 일 캘린더</h2>

      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        locale="ko-KR"
        calendarType="gregory"
        className="calendar-component"
      />

      <div className="calendar-info">
        <h3>선택된 날짜: {formatDate(selectedDate)}</h3>

        <div className="calendar-section">
          <h4>😊 감정 기록</h4>
          {filteredMoods.length > 0 ? (
            <ul>
              {filteredMoods.map((mood) => (
                <li key={mood.id} className="calendar-mood-item">
                  {mood.mood} — {mood.note || "(메모 없음)"}
                </li>
              ))}
            </ul>
          ) : (
            <p className="calendar-empty">감정 기록이 없습니다.</p>
          )}
        </div>

        <div className="calendar-section">
          <h4>📝 해야 할 일</h4>
          {filteredTodos.length > 0 ? (
            <ul>
              {filteredTodos.map((todo) => (
                <li key={todo.id} className="calendar-todo-item">
                  {todo.content} {todo.isDone ? "✅" : ""}
                </li>
              ))}
            </ul>
          ) : (
            <p className="calendar-empty">할 일이 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarView;

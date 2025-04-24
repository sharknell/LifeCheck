// src/components/CalendarView.jsx

import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarView = ({ moods, todos }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // ✅ 로컬 시간 기준 yyyy-mm-dd 포맷
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  };

  const filteredMoods = moods.filter(
    (mood) => formatDate(mood.date) === formatDate(selectedDate)
  );

  const filteredTodos = todos.filter(
    (todo) => formatDate(todo.createdAt || todo.date) === formatDate(selectedDate)
  );

  return (
    <div style={{ marginTop: 40 }}>
      <h2>📅 감정 및 할 일 캘린더</h2>

      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        locale="ko-KR"
        calendarType="gregory"
      />

      <div style={{ marginTop: 20 }}>
        <h3>선택된 날짜: {formatDate(selectedDate)}</h3>

        <div>
          <h4>😊 감정 기록</h4>
          {filteredMoods.length > 0 ? (
            <ul>
              {filteredMoods.map((mood) => (
                <li key={mood.id}>{mood.mood}</li>
              ))}
            </ul>
          ) : (
            <p>감정 기록이 없습니다.</p>
          )}
        </div>

        <div>
          <h4>📝 해야 할 일</h4>
          {filteredTodos.length > 0 ? (
            <ul>
              {filteredTodos.map((todo) => (
                <li key={todo.id}>
                  {todo.content} {todo.isDone ? '✅' : ''}
                </li>
              ))}
            </ul>
          ) : (
            <p>할 일이 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarView;

import React, { useState } from 'react';
import API from '../../services/api';

const MoodForm = ({ onAdd, existingLogs = [] }) => {
  const [mood, setMood] = useState('😐');
  const [note, setNote] = useState('');
  const today = new Date().toISOString().slice(0, 10);

  const alreadyLoggedToday = existingLogs.some(log => log.date === today);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (alreadyLoggedToday) return;

    try {
      const res = await API.post('/moods', {
        mood,
        note,
        date: today
      });
      onAdd(res.data);
      setNote('');
    } catch (err) {
      console.error('감정 저장 실패', err);
    }
  };

  const todayLog = existingLogs.find(log => log.date === today);

  return (
    <div>
      {alreadyLoggedToday && (
        <p>✅ 오늘 이미 감정을 기록했어요: <strong>{todayLog?.mood}</strong> - "{todayLog?.note}"</p>
      )}

      {!alreadyLoggedToday && (
        <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
          <label>오늘 기분은?</label>
          <select value={mood} onChange={e => setMood(e.target.value)}>
            <option value="😄">😄 행복</option>
            <option value="🙂">🙂 좋음</option>
            <option value="😐">😐 보통</option>
            <option value="😢">😢 슬픔</option>
            <option value="😡">😡 화남</option>
          </select>
          <br />
          <textarea
            placeholder="메모 (선택)"
            value={note}
            onChange={e => setNote(e.target.value)}
            style={{ width: '100%', height: 60, marginTop: 10 }}
          />
          <button type="submit" style={{ marginTop: 10 }}>기록하기</button>
        </form>
      )}
    </div>
  );
};

export default MoodForm;

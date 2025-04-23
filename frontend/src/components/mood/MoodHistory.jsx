import React from 'react';

const MoodHistory = ({ logs }) => {
  const sorted = [...logs].sort((a, b) => b.date.localeCompare(a.date));

  const getColor = (mood) => {
    switch (mood) {
      case '😄': return '#fff9c4';
      case '🙂': return '#d0f0c0';
      case '😐': return '#eeeeee';
      case '😢': return '#bbdefb';
      case '😡': return '#ffcdd2';
      default: return '#ffffff';
    }
  };

  return (
    <div style={{ marginTop: 40 }}>
      <h3>📜 감정 히스토리</h3>
      {sorted.map(log => (
        <div
          key={log.id}
          style={{
            backgroundColor: getColor(log.mood),
            padding: 12,
            borderRadius: 8,
            marginBottom: 10
          }}
        >
          <strong>{log.date}</strong> — <span style={{ fontSize: '1.2rem' }}>{log.mood}</span>
          <p style={{ margin: 5 }}>{log.note}</p>
        </div>
      ))}
    </div>
  );
};

export default MoodHistory;

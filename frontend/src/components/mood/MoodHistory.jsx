import React from "react";
import "../../styles/MoodHistory.css"; // ✅ 스타일 추가

const MoodHistory = ({ logs }) => {
  const sorted = [...logs].sort((a, b) => b.date.localeCompare(a.date));

  const getColor = (mood) => {
    switch (mood) {
      case "😄":
        return "#fff9c4";
      case "🙂":
        return "#d0f0c0";
      case "😐":
        return "#eeeeee";
      case "😢":
        return "#bbdefb";
      case "😡":
        return "#ffcdd2";
      default:
        return "#ffffff";
    }
  };

  return (
    <div className="mood-history">
      <h3>📜 감정 히스토리</h3>
      {sorted.map((log) => (
        <div
          key={log.id}
          className="mood-history-item"
          style={{ backgroundColor: getColor(log.mood) }}
        >
          <div className="mood-history-header">
            <strong>{log.date}</strong> —{" "}
            <span className="mood-emoji">{log.mood}</span>
          </div>
          <p className="mood-note">{log.note}</p>
        </div>
      ))}
    </div>
  );
};

export default MoodHistory;

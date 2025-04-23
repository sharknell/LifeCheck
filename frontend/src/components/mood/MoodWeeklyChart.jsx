import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const moodMap = {
  '😄': 5,
  '🙂': 4,
  '😐': 3,
  '😢': 2,
  '😡': 1
};

const MoodWeeklyChart = ({ logs }) => {
  const today = new Date();
  const last7days = [...Array(7)].map((_, i) => {
    const date = new Date(today);
    date.setDate(date.getDate() - (6 - i));
    return date.toISOString().slice(0, 10);
  });

  const dataPerDay = last7days.map(date => {
    const found = logs.find(log => log.date === date);
    return found ? moodMap[found.mood] : null;
  });

  const chartData = {
    labels: last7days,
    datasets: [
      {
        label: '감정 추세',
        data: dataPerDay,
        fill: false,
        borderColor: '#82b1ff',
        tension: 0.3
      }
    ]
  };

  const options = {
    scales: {
      y: {
        min: 1,
        max: 5,
        ticks: {
          callback: (value) => {
            const mood = Object.entries(moodMap).find(([emoji, num]) => num === value);
            return mood ? mood[0] : '';
          }
        }
      }
    }
  };

  return (
    <div style={{ marginTop: 40 }}>
      <h3>📈 최근 7일 감정 추세</h3>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default MoodWeeklyChart;

import React from 'react';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const MoodChart = ({ logs }) => {
  const moodCount = {
    '😄': 0,
    '🙂': 0,
    '😐': 0,
    '😢': 0,
    '😡': 0,
  };

  logs.forEach((log) => {
    moodCount[log.mood] = (moodCount[log.mood] || 0) + 1;
  });

  const data = {
    labels: Object.keys(moodCount),
    datasets: [
      {
        label: '감정 빈도',
        data: Object.values(moodCount),
        backgroundColor: '#a0c4ff',
      },
    ],
  };

  return (
    <div>
      <h3>감정 분석</h3>
      <Bar data={data} />
    </div>
  );
};

export default MoodChart;

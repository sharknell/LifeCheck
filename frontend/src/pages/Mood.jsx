import React, { useEffect, useState } from 'react';
import API from '../services/api';
import MoodForm from '../components/mood/MoodForm';
import MoodChart from '../components/mood/MoodChart';

const Mood = () => {
  const [logs, setLogs] = useState([]);

  const fetchLogs = async () => {
    try {
      const res = await API.get('/moods');
      setLogs(res.data);
    } catch (err) {
      console.error('감정 로그 불러오기 실패', err);
    }
  };

  const handleNewLog = (log) => {
    setLogs(prev => [...prev, log]);
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h2>😊 감정 기록</h2>
      <MoodForm onAdd={handleNewLog} />
      <MoodChart logs={logs} />
    </div>
  );
};

export default Mood;

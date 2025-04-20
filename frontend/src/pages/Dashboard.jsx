import { useEffect, useState } from 'react';
import API from '../services/api';

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    API.get('/auth/me')
      .then(res => setUser(res.data))
      .catch(err => console.error('유저 불러오기 실패', err));
  }, []);

  return (
    <div>
      <h2>👋 대시보드</h2>
      {user && (
        <div>
          <p>이메일: {user.email}</p>
          <p>닉네임: {user.nickname}</p>
        </div>
      )}
    </div>
  );
};
export default Dashboard;
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../../services/api';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';


const Header = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      API.get('/auth/me')
        .then(res => setUser(res.data))
        .catch(err => {
          console.error('❌ 유저 인증 실패:', err);
          logout(); // 토큰 유효하지 않으면 로그아웃
          navigate('/account');
        });
    }
  }, [isAuthenticated, logout, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/account');
  toast.success('🎉 로그아웃 하였습니다! 다시 방문해주세요 😊', {
         position: "top-center",
         autoClose: 2500,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: "light",
         style: {
           fontSize: '16px',
           fontWeight: 'bold',
           color: '#2e7d32',
           backgroundColor: '#e8f5e9',
           border: '1px solid #81c784',
           borderRadius: '12px',
           padding: '12px 20px',
         }
       });
  };

  if (!isAuthenticated) return null;

  return (
    <header style={headerStyle}>
      <div>
        <Link to="/dashboard">🏠 대시보드</Link>
        <Link to="/todos" style={{ marginLeft: '15px' }}>📝 투두</Link>
      </div>
      <div>
        {user && (
          <span style={{ marginRight: '10px' }}>
            👋 {user.nickname || user.email}
          </span>
        )}
        <button onClick={handleLogout}>로그아웃</button>
      </div>
    </header>
  );
};

const headerStyle = {
  padding: '15px 30px',
  backgroundColor: '#f0f0f0',
  borderBottom: '1px solid #ccc',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
};

export default Header;

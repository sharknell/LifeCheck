import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import API from '../../services/api';
import { toast } from 'react-toastify';

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await API.post('/auth/login', form);
      login(res.data.token); // context에 저장
      toast.success('🎉 로그인에 성공했어요! 환영합니다 😊', {
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
      
      navigate('/dashboard'); // 페이지 이동
    } catch (err) {
      setMessage(err.response?.data?.message || '❌ 로그인 실패');
    }
  };

  return (
    <div className="account-box">
      <h2>로그인</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="이메일"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">로그인</button>
        <p>{message}</p>
      </form>
    </div>
  );
};

export default LoginForm;

import React, { useContext, useEffect } from 'react';
import { AuthContext } from "../context/AuthContext";
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import "../styles/Account.css";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Account = () => {
  const { authToken } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (authToken) {
      toast.info("이미 로그인한 상태입니다.", {
        position: "top-center",
        autoClose: 3000,  // 3초 후 자동으로 닫히도록 설정
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "colored"
      });
      navigate('/dashboard'); // 로그인 상태에서 Account 페이지에 접근하면 대시보드로 리다이렉트
    }
  }, [authToken, navigate]);

  return (
    <div className="account-container">
      <LoginForm />
      <RegisterForm />
    </div>
  );
};

export default Account;

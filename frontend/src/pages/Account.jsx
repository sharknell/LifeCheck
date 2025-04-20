import React from 'react';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import "../styles/Account.css";

const Account = () => {
  return (
    <div className="account-container">
      <LoginForm />
      <RegisterForm />
    </div>
  );
};

export default Account;

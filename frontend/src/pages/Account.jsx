import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import "../styles/Account.css";

const Account = () => {
  const { authToken } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (authToken) {
      toast.info("이미 로그인된 상태입니다.", { position: "top-center" });
      navigate("/dashboard");
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

import React, { useContext, useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/Welcome.css";
import { AuthContext } from "../context/AuthContext";

const Welcome = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      API.get("/auth/me")
        .then((res) => setUser(res.data))
        .catch((err) => {
          console.error("❌ 유저 인증 실패:", err);
          logout();
          navigate("/account");
        });
    }
  }, [isAuthenticated, logout, navigate]);

  return (
    <div className="welcome-container">
      <h1>🚀 LifeTracker에 오신 것을 환영합니다!</h1>
      <p>매일의 할 일과 감정을 기록하고, 성장하는 나를 만나보세요.</p>
      <p>할 일 관리, 감정 트래킹, 목표 성취율 분석까지 한번에!</p>

      <button
        onClick={() => navigate(isAuthenticated ? "/dashboard" : "/account")}
        className="welcome-btn"
      >
        {isAuthenticated ? "서비스 이용하러 가기" : "로그인 / 회원가입 하기"}
      </button>
    </div>
  );
};

export default Welcome;

import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../services/api";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { useTheme } from "../../context/ThemeContext";
import "../../styles/Header.css";

const Header = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const { isDark, toggleTheme } = useTheme();
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

  const handleLogout = () => {
    logout();
    navigate("/account");
    toast.success("🎉 로그아웃 하였습니다! 다시 방문해주세요!", {
      position: "top-center",
    });
  };

  return (
    <header className="header">
      <div className="nav-left">
        <Link to="/dashboard" className="nav-link">
          🏠 대시보드
        </Link>
        <Link to="/todos" className="nav-link">
          📝 투두
        </Link>
      </div>
      <div className="nav-right">
        {isAuthenticated ? (
          <>
            {user && (
              <span className="user-info">
                👋 {user.nickname || user.email}
              </span>
            )}
            <button className="btn secondary" onClick={toggleTheme}>
              {isDark ? "☀️ Light" : "🌙 Dark"}
            </button>
            <button className="btn primary" onClick={handleLogout}>
              로그아웃
            </button>
          </>
        ) : (
          <Link to="/account" className="btn primary">
            로그인 / 회원가입
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;

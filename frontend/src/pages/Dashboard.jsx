import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css"; // 스타일 추가

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/auth/me")
      .then((res) => setUser(res.data))
      .catch((err) => console.error("유저 불러오기 실패", err));
  }, []);

  const handleLogout = () => {
    // 로그아웃 로직 추가 (예: 토큰 삭제 등)
    localStorage.removeItem("authToken");
    navigate("/account"); // 로그인 페이지로 리다이렉트
  };

  return (
    <div className="dashboard-container">
      <h2>👋 대시보드</h2>

      {user ? (
        <div className="user-info">
          <p>
            <strong>이메일:</strong> {user.email}
          </p>
          <p>
            <strong>닉네임:</strong> {user.nickname}
          </p>
          <p>
            <strong>가입일:</strong>{" "}
            {new Date(user.createdAt).toLocaleDateString()}
          </p>

          <button onClick={handleLogout} className="logout-btn">
            로그아웃
          </button>
        </div>
      ) : (
        <p>유저 정보를 불러오는 중입니다...</p>
      )}
    </div>
  );
};

export default Dashboard;

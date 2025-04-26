import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import API from "../../services/api";
import "../../styles/LoginForm.css";

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      login(res.data.token);
      toast.success("🎉 로그인 성공!", { position: "top-center" });
      navigate("/dashboard");
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ 로그인 실패");
    }
  };

  return (
    <div className="account-box">
      <h2>로그인</h2>
      <form onSubmit={handleSubmit} className="account-form">
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
        {message && <p className="account-message">{message}</p>}
      </form>
    </div>
  );
};

export default LoginForm;

import React, { useState } from "react";
import axios from "axios";
import "../../styles/LoginForm.css";

const RegisterForm = () => {
  const [form, setForm] = useState({ email: "", password: "", nickname: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      setMessage("🎉 회원가입 성공! 로그인 해주세요.");
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ 회원가입 실패");
    }
  };

  return (
    <div className="account-box">
      <h2>회원가입</h2>
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
        <input
          type="text"
          name="nickname"
          placeholder="닉네임"
          value={form.nickname}
          onChange={handleChange}
          required
        />
        <button type="submit">회원가입</button>
        {message && <p className="account-message">{message}</p>}
      </form>
    </div>
  );
};

export default RegisterForm;

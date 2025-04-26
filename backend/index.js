const express = require("express");
require("dotenv").config();

const initDatabase = require("../backend/src/config/initDatabase"); // ← 이렇게 수정
const sequelize = require("../backend/src/config/database");
const User = require("./src/models/User");
const authRoutes = require("./src/routes/authRoutes");

const Todo = require("./src/models/Todo");
const todoRoutes = require("./src/routes/todoRoutes");

const MoodLog = require("./src/models/MoodLog");
const moodRoutes = require("./src/routes/moodRoutes");

const cors = require("cors");
const app = express();
const PORT = 5001;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("🚀 LifeTracker API Server is running!");
});
app.use("/api/auth", authRoutes);
const startServer = async () => {
  await initDatabase(); // 🆕 DB 없으면 생성

  try {
    await sequelize.authenticate();
    console.log("✅ MySQL 연결 성공!");

    // 여기에 모델 import 후 sync 가능 (아직 없으면 생략 가능)
    await sequelize.sync(); // 🆕 테이블 자동 생성

    app.listen(PORT, () => {
      console.log(`🌐 서버 실행 중: http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ 서버 시작 중 오류:", err);
  }
};
app.use("/api/todos", todoRoutes);
app.use("/api/moods", moodRoutes);

startServer();

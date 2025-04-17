const express = require('express');
const path = require('path');
const app = express();

const port = process.env.PORT || 5000; // 포트 설정

// CORS 사용
const cors = require('cors');
const corsOption = {
    origin: "*",
    optionSuccessStatus: 200,
};
app.use(cors(corsOption));
app.use(express.json());

// /api/tests 경로로 접속하면 아래 작업 후 데이터 전송해줌
app.get('/api/tests', async (req, res) => {
    res.send({al:'Hi'});
});

// 정적 파일 미들웨어 설정
app.use(express.static(path.join(__dirname, '/build')));


// 서버 확인
app.listen(port, () => {
    console.log('server is running on ' + port);
});
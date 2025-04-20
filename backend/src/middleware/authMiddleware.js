const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: '인증 토큰이 없습니다.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next(); // 인증 통과 → 다음 미들웨어 or 컨트롤러 실행
  } catch (err) {
    return res.status(403).json({ message: '토큰이 유효하지 않습니다.' });
  }
};

module.exports = authMiddleware;

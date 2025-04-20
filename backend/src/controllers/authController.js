const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
  const { email, password, nickname } = req.body;

  try {
    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ message: '이미 존재하는 이메일입니다.' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashedPassword, nickname });

    res.status(201).json({ message: '회원가입 성공', user: { email: newUser.email, nickname: newUser.nickname } });
  } catch (err) {
    res.status(500).json({ message: '서버 오류', error: err });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: '비밀번호가 틀렸습니다.' });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '2h' });

    res.json({ message: '로그인 성공', token });
  } catch (err) {
    res.status(500).json({ message: '서버 오류', error: err });
  }
};
exports.getMe = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.userId, {
      attributes: ['id', 'email', 'nickname', 'createdAt']
    });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: '유저 정보 불러오기 실패', error: err });
  }
};

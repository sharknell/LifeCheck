const MoodLog = require('../models/MoodLog');

exports.addMood = async (req, res) => {
  try {
    const { mood, note, date } = req.body;
    if (!mood) return res.status(400).json({ message: '감정은 필수입니다.' });

    const moodLog = await MoodLog.create({
      mood,
      note,
      date: date || new Date().toISOString().slice(0, 10),
      userId: req.user.userId
    });

    res.status(201).json(moodLog);
  } catch (err) {
    res.status(500).json({ message: '서버 에러', error: err.message });
  }
};

exports.getMyMoods = async (req, res) => {
  try {
    const moods = await MoodLog.findAll({
      where: { userId: req.user.userId },
      order: [['date', 'ASC']]
    });

    res.json(moods);
  } catch (err) {
    res.status(500).json({ message: '조회 실패', error: err.message });
  }
};

const MoodLog = require('../models/MoodLog');

exports.addMood = async (req, res) => {
  const { mood, note, date } = req.body;
  if (!mood || !date) return res.status(400).json({ message: '감정과 날짜는 필수입니다.' });

  const moodLog = await MoodLog.create({
    mood,
    note,
    date,
    userId: req.user.userId
  });

  res.status(201).json(moodLog);
};

exports.getMyMoods = async (req, res) => {
  const moods = await MoodLog.findAll({
    where: { userId: req.user.userId },
    order: [['date', 'ASC']]
  });

  res.json(moods);
};

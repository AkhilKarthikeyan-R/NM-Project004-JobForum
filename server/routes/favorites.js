const express = require('express');
const router  = express.Router();
const User    = require('../models/User');
const Job     = require('../models/temp');         


router.post('/', async (req, res) => {
  try {
    const { userId, jobId } = req.body;
    if (!userId || !jobId) return res.status(400).json({ msg: 'Missing userId or jobId' });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    user.favorites ??= [];
    if (!user.favorites.includes(jobId)) user.favorites.push(jobId);

    await user.save();
    res.json({ msg: 'Added to favorites' });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});


router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('favorites');
    if (!user) return res.status(404).json({ msg: 'User not found' });

    res.json(user.favorites ?? []);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

router.delete('/:userId/:jobId', async (req, res) => {
  try {
    const { userId, jobId } = req.params;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    user.favorites = (user.favorites || []).filter(id => id.toString() !== jobId);
    await user.save();
    res.json({ msg: 'Removed from favorites' });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

module.exports = router;

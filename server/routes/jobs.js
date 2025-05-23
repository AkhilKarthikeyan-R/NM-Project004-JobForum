const express = require('express');
const Job = require('../models/temp');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { employerId, title, company, description, location, salary, website } = req.body;
    if (!employerId || !title || !company || !description) {
      return res.status(400).json({ msg: 'Missing required fields' });
    }
    const job = new Job({
      employerId,
      title,
      company,
      description,
      location,
      salary,
      website
    });
    await job.save();
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};
    if (search) {
      const regex = { $regex: search, $options: 'i' };
      query = {
        $or: [
          { title: regex },
          { company: regex },
          { description: regex },
          { location: regex }
        ]
      };
    }
    const jobs = await Job.find(query).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

router.get('/employer/:id', async (req, res) => {
  try {
    const jobs = await Job.find({ employerId: req.params.id }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Job deleted' });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

module.exports = router;

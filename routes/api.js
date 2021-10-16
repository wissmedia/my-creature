const router = require('express').Router();
const Creature = require('../models/creature')

router.post('/api/creature', ({ body }, res) => {
  Creature.create(body)
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

router.post('/api/creature/bulk', ({ body }, res) => {
  Creature.insertMany(body)
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

router.get('/api/creature', ({ body }, res) => {
  Creature.find({}).sort({ date: -1 })
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

module.exports = router;
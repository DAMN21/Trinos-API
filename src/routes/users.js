const express = require('express');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  throw new Error('New error');
  res.json({ data: 'My users route' });
});

module.exports = router;

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', { pageTitle: 'Hack Your Temp app' });
});
router.post('/weather', (req, res) => {
  const { cityName } = req.body;
  res.end(cityName);
});
module.exports = router;

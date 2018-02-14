const express = require('express');
const Router = express.Router();
const restaurants = require('./controllers/restaurants');

const router = Router();

router.route('/restaurants.json')
  .get(restaurants.index);

module.exports = router;

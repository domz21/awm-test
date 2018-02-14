const Restaurant = require('../models/restaurant-model');

//list existing restaurants from collection
const listed = async (req, res, next) => {
  const restaurants = await Restaurant.find()
    .exec();

  res.json({
    restaurants
  });
};

module.exports = { listed };

const Place = require('../models/place-model');

//list existing restaurants from collection
const placed = async (req, res, next) => {
  const places = await Place.find()
    .exec();

  res.json({
    places
  });
};

module.exports = { placed };

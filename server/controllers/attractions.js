const Attraction = require('../models/attraction-model');

//list existing restaurants from collection
const attracts = async (req, res, next) => {
  const attractions = await Attraction.find()
    .exec();

  res.json({
    attractions
  });
};

module.exports = { attracts };

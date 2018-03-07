const Restaurant = require('../models/restaurant-model');

//list existing restaurants from collection
const listed = async (req, res, next) => {
  const restaurants = await Restaurant.find()
    .exec();

  res.json({
    restaurants
  });
};

//create reviews
const created = async(req, res, next) => {
  const { name, open, close, closed, address, contact, type, desc } = req.body;
  //save comments
  const restaurant = await new Restaurant({
    //user: user_id,
    name: name,
    open: open,
    close: close,
    closed: closed,
    address: address,
    contact: contact,
    type: type,
    desc: desc
  }).save();

  res.json({
    restaurant: await Restaurant.findById(restaurant._id)
      //.populate(userRelation)
      .exec()
  });
};

module.exports = { listed, created };

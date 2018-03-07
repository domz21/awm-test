const Tour = require('../models/tour-model');

// const userRelation = {
//   path: 'user',
//   select: ['name', 'avatar'],
//   model: 'User'
// };

//list existing reviews
const list = async(req, res, next) => {
  const tours = await Tour.find()
    .sort({ 'created': -1 })
    //.populate(userRelation)
    .exec();
  res.json({
    tours
  });
};

//create reviews
const create = async(req, res, next) => {
  const { content } = req.body;
  //save comments
  const tour = await new Tour({
    //user: user_id,
    content: content,
    created: new Date,
  }).save();

  res.json({
    tour: await Tour.findById(tour._id)
      //.populate(userRelation)
      .exec()
  });
};

module.exports = { list, create };

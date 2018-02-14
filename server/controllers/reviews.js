const Review = require('../models/review-model');

const userRelation = {
  path: 'user',
  select: ['name', 'avatar'],
  model: 'User'
};

//list existing reviews
const list = async(req, res, next) => {
  const reviews = await Review.find()
    .sort({ 'created': -1 })
    .populate(userRelation)
    .exec();
  res.json({
    reviews
  });
};

//create reviews
const create = async(req, res, next) => {
  const { user_id, content } = req.body;
  //save comments
  const review = await new Review({
    user: user_id,
    content: content,
    created: new Date,
  }).save();

  res.json({
    review: await Review.findById(review._id)
      .populate(userRelation)
      .exec()
  });
};

module.exports = { list, create };

const express = require('express');
const mongoose = require('mongoose');
//const morgan = require('morgan');
// const passport = require('passport');
const bodyParser = require('body-parser');
const auth = require('./controllers/auth');
const reviews = require('./controllers/reviews');
const restaurants = require('./controllers/restaurants');
const attractions = require('./controllers/attractions');
//const router = require('./router');

//import app oauth configs
const config = require('./config');

//init http
const app = express();
app.use(bodyParser.json());

//mongoose connection
mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost/awm', () => {
mongoose.connect(config.mongo.dbURI, () => {
  console.log('connected to mongodb');
});

// var MongoClient = require('mongodb').MongoClient;
// var url = config.mongo.dbURI;
//
// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("awm-test");
//   dbo.collection("restaurants").find({}).toArray(function(err, result) {
//     if (err) throw err;
//     console.log(result);
//     db.close();
//   });
// });


//logger to output all requests to console
// app.use(morgan('combined'));
// app.use('/v1', router);

//auth routes
// app.get('/auth/facebook', auth.fbLogin);
// app.get('/auth/google', auth.googleLogin);
// app.get('/auth/facebook/callback', auth.fbMiddleware, auth.oauthCallback);
// app.get('/auth/google/callback', auth.googleMiddleware, auth.oauthCallback);

//comment routes
app.route('/reviews')
  .get(reviews.list)
  .put(reviews.create);

//restaurant routes
app.route('/restaurants')
  .get(restaurants.listed);

//attraction routes
app.route('/attractions')
  .get(attractions.attracts);

//launch server on port 3000
const server = app.listen(3000, () => {
  const { address, port } = server.address();
  console.log(`App listening on http://${address}:${port}`);
});

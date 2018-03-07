const express = require('express');
const mongoose = require('mongoose');
//const morgan = require('morgan');
// const passport = require('passport');
const bodyParser = require('body-parser');
const auth = require('./controllers/auth');
const reviews = require('./controllers/reviews');
const restaurants = require('./controllers/restaurants');
const attractions = require('./controllers/attractions');
const places = require('./controllers/places');
const tours = require('./controllers/tours');

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

//comment routes
app.route('/reviews')
  .get(reviews.list)
  .put(reviews.create);
app.route('/tours')
  .get(tours.list)
  .put(tours.create);

//restaurant routes
app.route('/restaurants')
  .get(restaurants.listed)
  .put(restaurants.created);

//attraction routes
app.route('/attractions')
  .get(attractions.attracts);

//all place routes
app.route('/places')
  .get(places.placed);

//launch server on port 3000
const server = app.listen(3000, () => {
  const { address, port } = server.address();
  console.log(`App listening on http://${address}:${port}`);
});

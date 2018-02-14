const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Restaurant = require('./models/restaurant-model');

const restaurants = [
  {
    name: 'Kalye Mabini',
    open: '11:00 AM',
    close: '9:30 PM',
    address: '214 Brgy. 3000, A. Mabini St., Malolos, Bulacan, Philippines',
    contact: '09991112121',
    owner: 'Filipino',
    desc: 'A Filipino restaurant',
    image: 'https://drive.google.com/open?id=1e2v21BufAB84YeYxAiAI1IkN8SIDcNAM'
  }
];

//mongoose.connect('mongodb://domz:jcw07051987@ds119258.mlab.com:19258/awm-test');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/awm', () => {
  console.log('connected to mongodb');
});

restaurants.map(data => {
  const restaurant = new Restaurant(data);
  restaurant.save();
  console.log('saved to db');
});

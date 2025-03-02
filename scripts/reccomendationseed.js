const mongoose = require('mongoose');
const Restaurant = require('../models/Restaurant');

mongoose.connect('mongodb://localhost:27017/dietchaiyo', { useNewUrlParser: true, useUnifiedTopology: true });

const restaurants = [
    { name: 'Healthy Bites', location: 'Kathmandu', budgetRange: 'Medium', dietaryOptions: ['Vegetarian'] },
    { name: 'Protein House', location: 'Lalitpur', budgetRange: 'High', dietaryOptions: ['Non-Vegetarian'] }
];

Restaurant.insertMany(restaurants).then(() => {
    console.log('Restaurants added');
    mongoose.connection.close();
});

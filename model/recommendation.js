const mongoose = require('mongoose');

const recommendationSchema = new mongoose.Schema({
    title: String,
    description: String,
    type: String,
    preferences: String
});

const Recommendation = mongoose.model('Recommendation', recommendationSchema);

module.exports = Recommendation;
const express = require('express');
const { getRecommendations } = require('../controller/recommendationController');

const router = express.Router();

router.get('/', getRecommendations); // Use only '/' since it's already prefixed by '/api/recommendations' in app.js

module.exports = router;

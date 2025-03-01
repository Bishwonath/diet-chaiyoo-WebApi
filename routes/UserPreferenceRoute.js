// routes/UserPreferenceRoute.js
const express = require('express');
const { savePreferences, getPreferences } = require('../controller/UserPreferenceController'); // Ensure correct import

const router = express.Router();

// POST request to save preferences
router.post('/', savePreferences);
router.get('/', getPreferences);  // Ensure getPreferences is being used here

module.exports = router;  // Ensure the router is exported correctly

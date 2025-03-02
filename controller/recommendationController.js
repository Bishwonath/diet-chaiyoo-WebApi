const Recommendation = require('../model/recommendation');
const userPreferences = require('../model/UserPreferences'); // Import the model

const jwt = require('jsonwebtoken');
const SECRET_KEY = "4fb876242331584a793776ad67394d0ee00290f140fd9ab047456d54fdff0bd1";

exports.getRecommendations = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, SECRET_KEY);
        const userId = decoded.userId;

        const userPreferences = await UserPreference.findOne({ user: userId });

        if (!userPreferences) {
            return res.status(404).json({ message: "User preferences not found" });
        }

        const preferences = userPreferences.preferences;
        const recommendations = await Recommendation.find({ preferences });

        res.status(200).json(recommendations);
    } catch (error) {
        console.error("Error fetching recommendations:", error);
        res.status(500).json({ error: error.message });
    }
};
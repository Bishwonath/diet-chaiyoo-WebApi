// controller/UserPreferenceController.js

const UserPreferences = require('../model/UserPreferences');
const jwt = require('jsonwebtoken');
const SECRET_KEY = "4fb876242331584a793776ad67394d0ee00290f140fd9ab047456d54fdff0bd1";

// The authenticateUser function
const authenticateUser = (req) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            throw new Error("No token provided");
        }
        const decoded = jwt.verify(token, SECRET_KEY);
        return decoded.userId;
    } catch (error) {
        throw new Error("Invalid or expired token");
    }
};

// Function to save user preferences
const savePreferences = async (req, res) => {
    try {
        const userId = authenticateUser(req); // Use the authenticateUser function for token verification

        const { healthGoal, dietaryPreference, weeklyBudget, age, weight, height } = req.body;

        const userPreference = new UserPreferences({
            userId,
            healthGoal,
            dietaryPreference,
            weeklyBudget,
            age,
            weight,
            height
        });

        await userPreference.save();
        res.status(200).json({ message: "Preferences saved successfully" });

    } catch (error) {
        console.error("Error saving preferences:", error);
        res.status(500).json({ error: error.message });
    }
};


// Function to get user preferences
const getPreferences = async (req, res) => {
    try {
        const userId = authenticateUser(req);
        const preferences = await UserPreferences.findOne({ userId });

        if (!preferences) {
            return res.status(404).json({ message: "Preferences not found" });
        }

        res.status(200).json(preferences);
    } catch (error) {
        console.error("Error fetching preferences:", error.message);
        res.status(401).json({ error: error.message });
    }
};

module.exports = {
    savePreferences,
    getPreferences // Make sure to export this function
};

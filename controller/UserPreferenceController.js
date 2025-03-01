const UserPreferences = require('../model/UserPreferences');
const jwt = require('jsonwebtoken');

const SECRET_KEY = "4fb876242331584a793776ad67394d0ee00290f140fd9ab047456d54fdff0bd1";

// ✅ Function to authenticate and extract userId from token
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

// ✅ Function to save user preferences
const savePreferences = async (req, res) => {
    try {
        const userId = authenticateUser(req);

        const { healthGoal, dietaryPreference, weeklyBudget, age, weight, height } = req.body;

        // Check if preferences already exist for the user
        let userPreference = await UserPreferences.findOne({ userId });

        if (userPreference) {
            return res.status(400).json({ error: "Preferences already exist. Use update instead." });
        }

        userPreference = new UserPreferences({
            userId,
            healthGoal,
            dietaryPreference,
            weeklyBudget,
            age,
            weight,
            height
        });

        await userPreference.save();
        res.status(201).json({ message: "Preferences saved successfully" });

    } catch (error) {
        console.error("Error saving preferences:", error);
        res.status(500).json({ error: error.message });
    }
};

// ✅ Function to get user preferences
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

// ✅ Function to update weekly budget (Fixed)
const updatePreferences = async (req, res) => {
    try {
        console.log("Incoming request body:", req.body);  // Debugging log
        const userId = authenticateUser(req);  // ✅ Extract userId correctly
        const { weeklyBudget } = req.body;

        // Ensure weeklyBudget is valid
        if (typeof weeklyBudget !== 'number' || weeklyBudget <= 0) {
            return res.status(400).json({ error: "Invalid weekly budget value" });
        }

        // ✅ Use $set to update specific fields
        const preferences = await UserPreferences.findOneAndUpdate(
            { userId },
            { $set: { weeklyBudget } }, 
            { new: true } // ✅ Returns updated document
        );

        if (!preferences) {
            return res.status(404).json({ error: "Preferences not found. Save preferences first." });
        }

        res.status(200).json({ message: "Weekly budget updated successfully", preferences });
    } catch (error) {
        console.error("Error updating preferences:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    savePreferences,
    getPreferences,
    updatePreferences
};

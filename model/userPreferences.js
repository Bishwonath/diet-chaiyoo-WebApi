const mongoose = require('mongoose');

const userPreferencesSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true, unique: true }, // ✅ Ensure 1 entry per user
    healthGoal: { type: String, required: true },
    dietaryPreference: { type: String, required: true },
    weeklyBudget: { type: Number, required: true },
    age: { type: Number, required: true },
    weight: { type: Number, required: true },
    height: { type: Number, required: true }
}, { timestamps: true });

const UserPreferences = mongoose.model('UserPreferences', userPreferencesSchema);

module.exports = UserPreferences;
const mongoose = require('mongoose');
const UserPreferences = require('./UserPreferences'); // Adjust the path to your UserPreferences model

describe('UserPreferences Model', () => {
  beforeEach(async () => {
    await mongoose.connect('mongodb://localhost/test-db', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterEach(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  describe('Schema', () => {
    it('should create a new user preference', async () => {
      const userPreference = new UserPreferences({
        userId: mongoose.Types.ObjectId(),
        healthGoal: 'Lose weight',
        dietaryPreference: 'Vegetarian',
        weeklyBudget: 50,
        age: 30,
        weight: 70,
        height: 175,
      });
      await userPreference.save();
      expect(userPreference).toHaveProperty('healthGoal');
      expect(userPreference.healthGoal).toBe('Lose weight');
    });

    it('should fail to create a user preference with invalid data', async () => {
      const userPreference = new UserPreferences({
        userId: mongoose.Types.ObjectId(),
        dietaryPreference: 'Vegetarian',
        weeklyBudget: 50,
        age: 30,
        weight: 70,
        height: 175,
      });
      try {
        await userPreference.save();
      } catch (error) {
        expect(error).toHaveProperty('message');
        expect(error.message).toContain('healthGoal is required');
      }
    });
  });

  describe('Static Methods', () => {
    // Assuming you have static methods in your model
    // it('should find user preferences by userId', async () => {
    //   const userPreference = new UserPreferences({
    //     userId: mongoose.Types.ObjectId(),
    //     healthGoal: 'Lose weight',
    //     dietaryPreference: 'Vegetarian',
    //     weeklyBudget: 50,
    //     age: 30,
    //     weight: 70,
    //     height: 175,
    //   });
    //   await userPreference.save();
    //   const foundUserPreference = await UserPreferences.findByUserId(userPreference.userId);
    //   expect(foundUserPreference).toHaveProperty('healthGoal');
    //   expect(foundUserPreference.healthGoal).toBe('Lose weight');
    // });
  });

  describe('Instance Methods', () => {
    // Assuming you have instance methods in your model
    // it('should update user preferences', async () => {
    //   const userPreference = new UserPreferences({
    //     userId: mongoose.Types.ObjectId(),
    //     healthGoal: 'Lose weight',
    //     dietaryPreference: 'Vegetarian',
    //     weeklyBudget: 50,
    //     age: 30,
    //     weight: 70,
    //     height: 175,
    //   });
    //   await userPreference.save();
    //   await userPreference.updatePreferences({
    //     healthGoal: 'Gain muscle',
    //     dietaryPreference: 'Paleo',
    //   });
    //   const updatedUserPreference = await UserPreferences.findById(userPreference._id);
    //   expect(updatedUserPreference).toHaveProperty('healthGoal');
    //   expect(updatedUserPreference.healthGoal).toBe('Gain muscle');
    // });
  });
});
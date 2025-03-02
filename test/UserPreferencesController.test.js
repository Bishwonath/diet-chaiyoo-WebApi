const UserPreferencesController = require('../controller/UserPreferencesController');
const UserPreferences = require('../model/UserPreferences');
const jwt = require('jsonwebtoken');

jest.mock('../model/UserPreferences'); // Mock the UserPreferences model

describe('UserPreferencesController', () => {
  const SECRET_KEY = "4fb876242331584a793776ad67394d0ee00290f140fd9ab047456d54fdff0bd1";
  const mockToken = jwt.sign({ userId: '123' }, SECRET_KEY);

  beforeEach(() => {
    UserPreferences.findOne = jest.fn();
    UserPreferences.findOneAndUpdate = jest.fn();
    UserPreferences.save = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('savePreferences', () => {
    it('should save user preferences', async () => {
      UserPreferences.findOne.mockResolvedValue(null);
      UserPreferences.save.mockResolvedValue({ message: 'Preferences saved successfully' });

      const req = {
        headers: { authorization: `Bearer ${mockToken}` },
        body: {
          healthGoal: 'Lose weight',
          dietaryPreference: 'Vegetarian',
          weeklyBudget: 50,
          age: 30,
          weight: 70,
          height: 175,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await UserPreferencesController.savePreferences(req, res);

      expect(UserPreferences.findOne).toHaveBeenCalledWith({ userId: '123' });
      expect(UserPreferences.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: 'Preferences saved successfully' });
    });

    it('should return an error if preferences already exist', async () => {
      UserPreferences.findOne.mockResolvedValue({});

      const req = {
        headers: { authorization: `Bearer ${mockToken}` },
        body: {
          healthGoal: 'Lose weight',
          dietaryPreference: 'Vegetarian',
          weeklyBudget: 50,
          age: 30,
          weight: 70,
          height: 175,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await UserPreferencesController.savePreferences(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Preferences already exist. Use update instead.' });
    });
  });

  describe('getPreferences', () => {
    it('should get user preferences', async () => {
      UserPreferences.findOne.mockResolvedValue({
        healthGoal: 'Lose weight',
        dietaryPreference: 'Vegetarian',
        weeklyBudget: 50,
        age: 30,
        weight: 70,
        height: 175,
      });

      const req = {
        headers: { authorization: `Bearer ${mockToken}` },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await UserPreferencesController.getPreferences(req, res);

      expect(UserPreferences.findOne).toHaveBeenCalledWith({ userId: '123' });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        healthGoal: 'Lose weight',
        dietaryPreference: 'Vegetarian',
        weeklyBudget: 50,
        age: 30,
        weight: 70,
        height: 175,
      });
    });

    it('should return an error if preferences do not exist', async () => {
      UserPreferences.findOne.mockResolvedValue(null);

      const req = {
        headers: { authorization: `Bearer ${mockToken}` },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await UserPreferencesController.getPreferences(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Preferences not found' });
    });
  });

  describe('updatePreferences', () => {
    it('should update user preferences', async () => {
      UserPreferences.findOneAndUpdate.mockResolvedValue({
        healthGoal: 'Gain muscle',
        dietaryPreference: 'Paleo',
        weeklyBudget: 100,
      });

      const req = {
        headers: { authorization: `Bearer ${mockToken}` },
        body: {
          weeklyBudget: 100,
          healthGoal: 'Gain muscle',
          dietaryPreference: 'Paleo',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await UserPreferencesController.updatePreferences(req, res);

      expect(UserPreferences.findOneAndUpdate).toHaveBeenCalledWith(
        { userId: '123' },
        { $set: { weeklyBudget: 100, healthGoal: 'Gain muscle', dietaryPreference: 'Paleo' } },
        { new: true }
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Preferences updated successfully',
        preferences: {
          healthGoal: 'Gain muscle',
          dietaryPreference: 'Paleo',
          weeklyBudget: 100,
        },
      });
    });

    it('should return an error if no valid fields to update', async () => {
      const req = {
        headers: { authorization: `Bearer ${mockToken}` },
        body: {},
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await UserPreferencesController.updatePreferences(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'No valid fields to update.' });
    });

    it('should return an error if preferences do not exist', async () => {
      UserPreferences.findOneAndUpdate.mockResolvedValue(null);

      const req = {
        headers: { authorization: `Bearer ${mockToken}` },
        body: {
          weeklyBudget: 100,
          healthGoal: 'Gain muscle',
          dietaryPreference: 'Paleo',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await UserPreferencesController.updatePreferences(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Preferences not found. Save preferences first.' });
    });
  });
});
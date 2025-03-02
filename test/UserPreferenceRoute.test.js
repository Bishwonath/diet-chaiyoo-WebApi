const request = require('supertest');
const app = require('../app'); // Adjust the path to where your Express app is defined
const UserPreference = require('../model/UserPreference'); // Adjust the path to your UserPreference model

// Clear the database before each test
beforeEach(async () => {
  await UserPreference.deleteMany({});
});

// Clear the database after all tests
afterAll(async () => {
  await UserPreference.deleteMany({});
});

describe('UserPreference Route', () => {
  describe('POST /user_preferences', () => {
    it('should create a new user preference', async () => {
      const response = await request(app)
        .post('/user_preferences')
        .send({
          userId: '123',
          preferences: {
            theme: 'dark',
            notifications: true,
          },
        });
      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('userId');
      expect(response.body.userId).toBe('123');
    });
  });

  describe('GET /user_preferences', () => {
    it('should retrieve all user preferences', async () => {
      await UserPreference.create({
        userId: '123',
        preferences: {
          theme: 'dark',
          notifications: true,
        },
      });
      const response = await request(app).get('/user_preferences');
      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBe(1);
    });
  });

  describe('PUT /user_preferences', () => {
    it('should update a user preference', async () => {
      const createResponse = await request(app)
        .post('/user_preferences')
        .send({
          userId: '123',
          preferences: {
            theme: 'dark',
            notifications: true,
          },
        });
      const response = await request(app)
        .put('/user_preferences')
        .send({
          userId: '123',
          preferences: {
            theme: 'light',
            notifications: false,
          },
        });
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('userId');
      expect(response.body.userId).toBe('123');
      expect(response.body.preferences.theme).toBe('light');
      expect(response.body.preferences.notifications).toBe(false);
    });
  });
});
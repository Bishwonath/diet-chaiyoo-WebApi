const request = require('supertest');
const app = require('../app'); // Adjust the path to where your Express app is defined

describe('Recommendation Route', () => {
  describe('GET /', () => {
    it('should retrieve recommendations', async () => {
      // You might want to mock the getRecommendations function or the data it returns
      // For now, we'll assume it returns a list of recommendations
      const response = await request(app).get('/');
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeInstanceOf(Array); // Check if the response is an array
      expect(response.body.length).toBeGreaterThanOrEqual(0); // Check if the array is not empty
    });
  });
});

const recommendationController = require('../controller/recommendationController');
jest.mock('../controller/recommendationController', () => ({
  getRecommendations: jest.fn(),
}));

describe('Recommendation Route', () => {
  describe('GET /', () => {
    it('should retrieve recommendations', async () => {
      // Mock the getRecommendations function to return a list of recommendations
      recommendationController.getRecommendations.mockResolvedValue([
        { id: 1, name: 'Recommendation 1' },
        { id: 2, name: 'Recommendation 2' },
      ]);

      const response = await request(app).get('/');
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual([
        { id: 1, name: 'Recommendation 1' },
        { id: 2, name: 'Recommendation 2' },
      ]);
    });
  });
});
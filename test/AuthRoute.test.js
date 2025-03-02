const request = require('supertest');
const app = require('../app'); // Adjust the path to where your Express app is defined

describe('Auth Route', () => {
  describe('POST /login', () => {
    it('should return a success response for a valid login', async () => {
      // Assuming your login function returns a success response with a token
      const response = await request(app)
        .post('/login')
        .send({
          username: 'testuser',
          password: 'password123',
        });
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('token');
    });

    it('should return an error response for an invalid login', async () => {
      const response = await request(app)
        .post('/login')
        .send({
          username: 'invaliduser',
          password: 'wrongpassword',
        });
      expect(response.statusCode).toBe(401); // Unauthorized
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('POST /register', () => {
    it('should create a new user and return a success response', async () => {
      const response = await request(app)
        .post('/register')
        .send({
          username: 'newuser',
          email: 'newuser@example.com',
          password: 'password123',
        });
      expect(response.statusCode).toBe(201); // Created
      expect(response.body).toHaveProperty('user');
    });

    it('should return an error response for a duplicate user', async () => {
      // First, create a user to simulate a duplicate
      await request(app)
        .post('/register')
        .send({
          username: 'duplicateuser',
          email: 'duplicate@example.com',
          password: 'password123',
        });

      const response = await request(app)
        .post('/register')
        .send({
          username: 'duplicateuser',
          email: 'duplicate@example.com',
          password: 'password123',
        });
      expect(response.statusCode).toBe(400); // Bad Request
      expect(response.body).toHaveProperty('error');
    });
  });
});

const authController = require('../controller/AuthController');
jest.mock('../controller/AuthController', () => ({
  login: jest.fn(),
  register: jest.fn(),
}));

describe('Auth Route', () => {
  describe('POST /login', () => {
    it('should return a success response for a valid login', async () => {
      authController.login.mockResolvedValue({ token: 'mocked-token' });

      const response = await request(app)
        .post('/login')
        .send({
          username: 'testuser',
          password: 'password123',
        });
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({ token: 'mocked-token' });
    });
  });

  describe('POST /register', () => {
    it('should create a new user and return a success response', async () => {
      authController.register.mockResolvedValue({ user: { username: 'newuser' } });

      const response = await request(app)
        .post('/register')
        .send({
          username: 'newuser',
          email: 'newuser@example.com',
          password: 'password123',
        });
      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual({ user: { username: 'newuser' } });
    });
  });
});
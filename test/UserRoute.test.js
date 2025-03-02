const request = require('supertest');
const app = require('../app'); // Adjust the path to where your Express app is defined
const User = require('../model/user'); // Adjust the path to your User model

// Clear the database before each test
beforeEach(async () => {
  await User.deleteMany({});
});

// Clear the database after all tests
afterAll(async () => {
  await User.deleteMany({});
});

describe('User Route', () => {
  describe('GET /users', () => {
    it('should return all users', async () => {
      await User.create({ name: 'Test User', email: 'test@example.com' });
      const response = await request(app).get('/users');
      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBe(1);
    });
  });

  describe('POST /users', () => {
    it('should create a new user', async () => {
      const response = await request(app)
        .post('/users')
        .send({ name: 'New User', email: 'newuser@example.com' });
      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('name');
      expect(response.body.name).toBe('New User');
    });
  });

  describe('GET /users/:id', () => {
    it('should retrieve a user by id', async () => {
      const user = await User.create({ name: 'Specific User', email: 'specific@example.com' });
      const response = await request(app).get(`/users/${user._id}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('name');
      expect(response.body.name).toBe('Specific User');
    });
  });

  describe('DELETE /users/:id', () => {
    it('should delete a user by id', async () => {
      const user = await User.create({ name: 'Deletable User', email: 'deletable@example.com' });
      const response = await request(app).delete(`/users/${user._id}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe('User deleted successfully');
    });
  });

  describe('PUT /users/:id', () => {
    it('should update a user by id', async () => {
      const user = await User.create({ name: 'Updatable User', email: 'updatable@example.com' });
      const response = await request(app)
        .put(`/users/${user._id}`)
        .send({ name: 'Updated User', email: 'updated@example.com' });
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('name');
      expect(response.body.name).toBe('Updated User');
    });
  });

  describe('POST /users/uploadimage', () => {
    it('should upload an image and save it', async () => {
      // This test is more complex and requires a file to be sent
      // You might need to mock the file or use a library like `form-data`
      // to simulate a file upload. This is a simplified example.
      const response = await request(app)
        .post('/users/uploadimage')
        .field('file', 'path_to_your_test_image.jpg') // Replace with a real file path
        .expect(200);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe('Image uploaded successfully');
    });
  });
});
const mongoose = require('mongoose');
const Cred = require('./Cred'); // Adjust the path to your Cred model

describe('Cred Model', () => {
  beforeEach(async () => {
    // Connect to a test database before each test
    await mongoose.connect('mongodb://localhost/test-db', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterEach(async () => {
    // Delete all documents from the test database after each test
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  it('should create a new cred document', async () => {
    const cred = new Cred({
      username: 'testuser',
      password: 'password123',
      role: 'admin',
    });
    await cred.save();
    expect(cred).toHaveProperty('username');
    expect(cred.username).toBe('testuser');
  });

  it('should fail to create a cred document without a username', async () => {
    const cred = new Cred({
      password: 'password123',
      role: 'admin',
    });
    try {
      await cred.save();
    } catch (error) {
      expect(error).toHaveProperty('message');
      expect(error.message).toContain('username is required');
    }
  });

  it('should fail to create a cred document without a password', async () => {
    const cred = new Cred({
      username: 'testuser',
      role: 'admin',
    });
    try {
      await cred.save();
    } catch (error) {
      expect(error).toHaveProperty('message');
      expect(error.message).toContain('password is required');
    }
  });

  it('should fail to create a cred document without a role', async () => {
    const cred = new Cred({
      username: 'testuser',
      password: 'password123',
    });
    try {
      await cred.save();
    } catch (error) {
      expect(error).toHaveProperty('message');
      expect(error.message).toContain('role is required');
    }
  });

  // Add more tests for any other model methods or behaviors
});
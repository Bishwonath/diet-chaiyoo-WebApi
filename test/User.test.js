const mongoose = require('mongoose');
const User = require('./User'); // Adjust the path to your User model

describe('User Model', () => {
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

  it('should create a new user', async () => {
    const user = new User({
      full_name: 'Test User',
      phone: '1234567890',
      username: 'testuser',
      password: 'password123',
    });
    await user.save();
    expect(user).toHaveProperty('full_name');
    expect(user.full_name).toBe('Test User');
  });

  it('should fail to create a user without required fields', async () => {
    const user = new User({
      phone: '1234567890',
      username: 'testuser',
      password: 'password123',
    });
    try {
      await user.save();
    } catch (error) {
      expect(error).toHaveProperty('message');
      expect(error.message).toContain('full_name is required');
    }
  });

  it('should set hasSetPreferences to false by default', async () => {
    const user = new User({
      full_name: 'Test User',
      phone: '1234567890',
      username: 'testuser',
      password: 'password123',
    });
    await user.save();
    expect(user).toHaveProperty('hasSetPreferences');
    expect(user.hasSetPreferences).toBe(false);
  });

  // Add more tests for any other model methods or behaviors
});
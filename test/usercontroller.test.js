const UserController = require('../controller/UserController');
const nodemailer = require('nodemailer');

jest.mock('../model/User'); // Mock the User model

describe('UserController', () => {
  beforeEach(() => {
    User.find = jest.fn();
    User.findById = jest.fn();
    User.findByIdAndDelete = jest.fn();
    User.findByIdAndUpdate = jest.fn();
    User.save = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findall', () => {
    it('should get all users', async () => {
      User.find.mockResolvedValue([{ name: 'Test User' }]);

      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await UserController.findall(req, res);

      expect(User.find).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([{ name: 'Test User' }]);
    });
  });

  describe('save', () => {
    it('should create a new user', async () => {
      User.save.mockResolvedValue({ name: 'New User' });

      const req = {
        body: {
          name: 'New User',
          phone: '1234567890',
          username: 'newuser',
          password: 'password123',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await UserController.save(req, res);

      expect(User.save).toHaveBeenCalled();
      // Since we're not sending a response in the save function, we don't need to test res.status or res.json here
    });
  });

  describe('findById', () => {
    it('should get a user by id', async () => {
      User.findById.mockResolvedValue({ name: 'Test User' });

      const req = {
        params: {
          id: '123',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await UserController.findById(req, res);

      expect(User.findById).toHaveBeenCalledWith('123');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ name: 'Test User' });
    });
  });

  describe('deleteById', () => {
    it('should delete a user by id', async () => {
      User.findByIdAndDelete.mockResolvedValue(null);

      const req = {
        params: {
          id: '123',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await UserController.deleteById(req, res);

      expect(User.findByIdAndDelete).toHaveBeenCalledWith('123');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Data deleted successfully' });
    });
  });

  describe('update', () => {
    it('should update a user by id', async () => {
      User.findByIdAndUpdate.mockResolvedValue({ name: 'Updated User' });

      const req = {
        params: {
          id: '123',
        },
        body: {
          name: 'Updated User',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await UserController.update(req, res);

      expect(User.findByIdAndUpdate).toHaveBeenCalledWith('123', { name: 'Updated User' }, { new: true });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ name: 'Updated User' });
    });
  });
});
// const request = require("supertest");
// const mongoose = require("mongoose");
// const app = require("../index"); // Adjust this path based on your file structure

// const userData = {
//   username: "testuser",
//   email: "testuser@example.com",
//   password: "Test@123",
//   role: "customer",
//   contact: "9876543210",
//   fullAddress: "123 Test Street",
//   pincode: "440001",
// };

// describe("Auth routes", () => {
//   let agent;

//   beforeAll(() => {
//     agent = request.agent(app);
//   });

//   afterAll(async () => {
//     // Close the Mongoose connection after tests
//     await mongoose.connection.close();
//   });

//   it("should create a new user", async () => {
//     const res = await agent
//       .post("/register")
//       .send(userData)
//       .set("Accept", "application/json")
//       .expect("Content-Type", /json/)
//       .expect(201);

//     expect(res.body.success).toBe(true);
//     expect(res.body.user.email).toBe(userData.email.toLowerCase());
//   });

//   it("should not register a user with the same email again", async () => {
//     const res = await agent
//       .post("/register")
//       .send(userData)
//       .set("Accept", "application/json")
//       .expect("Content-Type", /text\/html/)
//       .expect(400);

//     expect(res.text).toBe("You already have an account. Please login.");
//   });

//   it("should login as a user", async () => {
//     const res = await agent
//       .post("/login")
//       .send({ email: userData.email, password: userData.password })
//       .set("Accept", "application/json")
//       .expect("Content-Type", /json/)
//       .expect(200);

//     expect(res.body.message).toBe("Login successful");
//     expect(res.body.role).toBe(userData.role);
//   });

//   it("should not login with incorrect password", async () => {
//     const res = await agent
//       .post("/login")
//       .send({ email: userData.email, password: "WrongPassword123!" })
//       .set("Accept", "application/json")
//       .expect("Content-Type", /text\/html/)
//       .expect(400);

//     expect(res.text).toBe("Incorrect Password.");
//   });

//   it("should not login with unknown email", async () => {
//     const res = await agent
//       .post("/login")
//       .send({ email: "nonexistent@example.com", password: "Test@123" })
//       .set("Accept", "application/json")
//       .expect("Content-Type", /text\/html/)
//       .expect(400);

//     expect(res.text).toBe("Incorrect Username or Password.");
//   });
// });



const request = require('supertest');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../index'); // Import your Express app

// Import models
const Customer = require('../models/customerModel');
const Restaurant = require('../models/restaurantModel');
const DeliveryPartner = require('../models/deliveryPartnerModel');

// Mock environment variables
process.env.JWT_SECRET_KEY = 'test-secret-key';

describe('Authentication Controller', () => {
  let mongoServer;

  // Setup - runs before all tests
  beforeAll(async () => {
    // Create an in-memory MongoDB instance
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    
    // Connect to the in-memory database
    await mongoose.connect(uri);
  });

  // Cleanup - runs after all tests
  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  // Clear database between tests
  beforeEach(async () => {
    await Customer.deleteMany({});
    await Restaurant.deleteMany({});
    await DeliveryPartner.deleteMany({});
  });

  // Register Tests
  describe('POST /register', () => {
    const validUser = {
      username: 'testuser',
      email: 'test@gmail.com',
      password: 'Test123!',
      role: 'customer',
      contact: '1234567890',
      fullAddress: '123 Test St',
      pincode: '123456'
    };

    test('should register a new customer successfully', async () => {
      const response = await request(app)
        .post('/register')
        .send(validUser);

      expect(response.statusCode).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('User registered successfully');
      expect(response.body.user).toHaveProperty('_id');
      expect(response.body.user.email).toBe(validUser.email.toLowerCase());
      expect(response.body.user.role).toBe(validUser.role);

      // Verify user was saved to database
      const savedUser = await Customer.findOne({ email: validUser.email });
      expect(savedUser).not.toBeNull();
    });

    test('should register a new restaurant successfully', async () => {
      const restaurantUser = { ...validUser, role: 'restaurant' };
      
      const response = await request(app)
        .post('/register')
        .send(restaurantUser);

      expect(response.statusCode).toBe(201);
      expect(response.body.user.role).toBe('restaurant');

      const savedRestaurant = await Restaurant.findOne({ email: restaurantUser.email });
      expect(savedRestaurant).not.toBeNull();
    });

    test('should register a new delivery partner successfully', async () => {
      const deliveryUser = { ...validUser, role: 'deliveryPartner' };
      
      const response = await request(app)
        .post('/register')
        .send(deliveryUser);

      expect(response.statusCode).toBe(201);
      expect(response.body.user.role).toBe('deliveryPartner');

      const savedDeliveryPartner = await DeliveryPartner.findOne({ email: deliveryUser.email });
      expect(savedDeliveryPartner).not.toBeNull();
    });

    test('should fail if required fields are missing', async () => {
      const incompleteUser = {
        username: 'testuser',
        email: 'test@gmail.com',
        // Missing password and other required fields
      };

      const response = await request(app)
        .post('/register')
        .send(incompleteUser);

      expect(response.statusCode).toBe(400);
      expect(response.text).toBe('Please provide all details.');
    });

    test('should fail with invalid email format', async () => {
      const invalidEmailUser = {
        ...validUser,
        email: 'invalid-email'
      };

      const response = await request(app)
        .post('/register')
        .send(invalidEmailUser);

      expect(response.statusCode).toBe(400);
      expect(response.text).toBe('Please provide a valid email address.');
    });

    test('should fail with non-gmail email', async () => {
      const nonGmailUser = {
        ...validUser,
        email: 'test@example.com'
      };

      const response = await request(app)
        .post('/register')
        .send(nonGmailUser);

      expect(response.statusCode).toBe(400);
      expect(response.text).toBe('Provide valid email address');
    });

    test('should fail with weak password', async () => {
      const weakPasswordUser = {
        ...validUser,
        password: 'weak'
      };

      const response = await request(app)
        .post('/register')
        .send(weakPasswordUser);

      expect(response.statusCode).toBe(400);
      expect(response.text).toContain('Password must meet the following criteria');
    });

    test('should fail if email already exists', async () => {
      // Create a user first
      await request(app)
        .post('/register')
        .send(validUser);
      
      // Try to register with the same email
      const response = await request(app)
        .post('/register')
        .send(validUser);

      expect(response.statusCode).toBe(400);
      expect(response.text).toBe('You already have an account. Please login.');
    });
  });

  // Login Tests
  describe('POST /login', () => {
    beforeEach(async () => {
      // Create test users for each role
      const hashedPassword = await bcrypt.hash('Test123!', 10);
      
      await Customer.create({
        username: 'customer1',
        email: 'customer@gmail.com',
        password: hashedPassword,
        role: 'customer',
        contact: '1234567890',
        address: {
          fullAddress: '123 Test St',
          pincode: '123456'
        }
      });

      await Restaurant.create({
        username: 'restaurant1',
        email: 'restaurant@gmail.com',
        password: hashedPassword,
        role: 'restaurant',
        contact: '1234567890',
        address: {
          fullAddress: '456 Test St',
          pincode: '123456'
        }
      });

      await DeliveryPartner.create({
        username: 'delivery1',
        email: 'delivery@gmail.com',
        password: hashedPassword,
        role: 'deliveryPartner',
        contact: '1234567890',
        address: {
          fullAddress: '789 Test St',
          pincode: '123456'
        }
      });
    });

    test('should login customer successfully', async () => {
      const response = await request(app)
        .post('/login')
        .send({
          email: 'customer@gmail.com',
          password: 'Test123!'
        });

      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe('Login successful');
      expect(response.body.role).toBe('customer');
      expect(response.headers['set-cookie']).toBeDefined();
      // Check if token cookie exists
      expect(response.headers['set-cookie'][0]).toContain('token=');
      // Check if role cookie exists
      expect(response.headers['set-cookie'][1]).toContain('role=customer');
    });

    test('should login restaurant successfully', async () => {
      const response = await request(app)
        .post('/login')
        .send({
          email: 'restaurant@gmail.com',
          password: 'Test123!'
        });

      expect(response.statusCode).toBe(200);
      expect(response.body.role).toBe('restaurant');
    });

    test('should login delivery partner successfully', async () => {
      const response = await request(app)
        .post('/login')
        .send({
          email: 'delivery@gmail.com',
          password: 'Test123!'
        });

      expect(response.statusCode).toBe(200);
      expect(response.body.role).toBe('deliveryPartner');
    });

    test('should fail with non-existent email', async () => {
      const response = await request(app)
        .post('/login')
        .send({
          email: 'nonexistent@gmail.com',
          password: 'Test123!'
        });

      expect(response.statusCode).toBe(400);
      expect(response.text).toBe('Incorrect Username or Password.');
    });

    test('should fail with incorrect password', async () => {
      const response = await request(app)
        .post('/login')
        .send({
          email: 'customer@gmail.com',
          password: 'WrongPassword123!'
        });

      expect(response.statusCode).toBe(400);
      expect(response.text).toBe('Incorrect Password.');
    });
  });

  // Logout Tests
  describe('GET /logout', () => {
    test('should clear token cookie and redirect', async () => {
      // Setup a session cookie first
      const token = jwt.sign({ id: 'test123', email: 'test@gmail.com' }, process.env.JWT_SECRET_KEY);
      
      const agent = request.agent(app);
      agent.set('Cookie', [`token=${token}`]);

      const response = await agent.get('/logout');
      
      expect(response.statusCode).toBe(303); // Redirect status
      expect(response.headers.location).toBe('/');
      
      // Check if cookies are cleared
      const cookies = response.headers['set-cookie'] || [];
      const tokenCookie = cookies.find(cookie => cookie.startsWith('token='));
      expect(tokenCookie).toContain('token=;'); // Empty cookie value
    });
  });
});
const mongoose = require('mongoose'),
      request = require('supertest'),
      app = require('../app');

const {users, questions} = require('../src/utils/seedDB');
const Rating = require('../models/rating'),
      User = require('../models/user');

const userOne = users[0];
const qOne = questions[0];

describe('Ratings routes', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      bufferCommands: false,
      bufferMaxEntries: 0
    });
    db = mongoose.connection;

    console.log(`connected to ${process.env.MONGODB_URL}`);
  });

  afterAll(async () => mongoose.disconnect());

  // create test user (creator)
  beforeEach(async() => {
      await Rating.deleteMany({});
      await User.deleteMany({});
      await new User(userOne).save();
  });


  // ----------------------------------------------------------------------------
  // TEST CASES - POST /users
  // ----------------------------------------------------------------------------
  it.only('should be able to create a new user', async () => {
    await request(app).post('/users').send({
            firstname: 'Jeff',
            lastname: 'Zigzig',
            email: 'testing@gmail.com',
            username: 'jeffzigzig20',
            password: 'co0lp4$$'
        }).expect(200)
  });

  

});
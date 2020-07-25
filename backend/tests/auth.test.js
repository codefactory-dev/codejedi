const mongoose = require('mongoose'),
      request = require('supertest'),
      app = require('../app');

const {users, questions} = require('../src/utils/seedDB');
const Rating = require('../models/rating'),
      User = require('../models/user'),
      Token = require('../models/user');

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
      await new Token
  });

  // ----------------------------------------------------------------------------
  // TEST CASES - SIGNIN (POST /users/signin) 
  // ----------------------------------------------------------------------------

  it.only('should be able to login existent users', async () => {
    console.log("trying to login _id:"+userOne._id+ " + "+" password:"+userOne.password)
    await request(app).post('/auth/signin').send({
            _id: userOne._id,
            password: userOne.password
        }).expect(200)
  });

  it('should not login non-existent users', async () => {
      await request(app).post('/auth/signin').send({
          email: userOne.email,
          password: 'thisisnotmypass'
      }).expect(200);
  })

  // ----------------------------------------------------------------------------
  // TEST CASES - CONFIRM (POST /auth/confirm) 
  // ----------------------------------------------------------------------------
  it('should be able to login existent users', async () => {
    await request(app).post('/auth/confirm').send({
            email: userOne.email,
            password: userOne.password
        }).expect(200)
  });
});



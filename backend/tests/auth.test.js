const {connectDB, disconnectDB} = require('../src/utils/connectDB'),
      {users, questions} = require('../src/utils/seedDB'),
      Rating = require('../models/rating'),
      User = require('../models/user'),
      request = require('supertest'),
      app = require('../app');

const userOne = users[0];
const qOne = questions[0];

describe('Login routes', () => {

  beforeAll(() => { let {connection, db} = connectDB() });

  afterAll(disconnectDB);

  // create test user (creator)
  beforeEach(async() => {
      await Rating.deleteMany({});
      await User.deleteMany({});
      await new User(userOne).save();
  });


  // ----------------------------------------------------------------------------
  // TEST CASES - POST /users/login 
  // ----------------------------------------------------------------------------

  it('should be able to login existent users', async () => {
    await request(app).post('/users/signin').send({
            email: userOne.email,
            password: userOne.password
        }).expect(200)
  });

  it('should not login non-existent users', async () => {
      await request(app).post('/users/signin').send({
          email: userOne.email,
          password: 'thisisnotmypass'
      }).expect(200);
  })
});



const {connectDB, disconnectDB} = require('../src/utils/connectDB'),
      {users, questions, tokens} = require('../src/utils/seedDB'),
      Rating = require('../models/rating'),
      User = require('../models/user'),
      Token = require('../models/token'),
      request = require('supertest'),
      app = require('../app');

const userOne = users[0];
const tokenOne = tokens[0];
const qOne = questions[0];

describe('Auth routes', () => {

  beforeAll(() => { let {connection, db} = connectDB() });

  afterAll(disconnectDB);

  // create test user (creator)
  beforeEach(async() => {
      await Rating.deleteMany({});
      await User.deleteMany({});
      await Token.deleteMany({});
      await new User(userOne).save();
      await new Token(tokenOne).save();
  });


  // ----------------------------------------------------------------------------
  // TEST CASES - POST /users/login 
  // ----------------------------------------------------------------------------

  it('should be able to sign-in existent users', async () => {
    await request(app).post('/auth/signin').send({
            email: userOne.email,
            password: userOne.password
        }).expect(200)
  });

  it('should not sign-in non-existent users', async () => {
      await request(app).post('/auth/signin').send({
          email: userOne.email,
          password: 'thisisnotmypass'
      }).expect(401);
  })

  it('Should be able to confirm existing user account when provided with a valid token', async () => {
    await request(app).post('/auth/validate').send({
        email: userOne.email,
        token: tokenOne.token
    }).expect(200);
  });

});



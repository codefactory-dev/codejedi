const {users, questions, tokens} = require('../src/utils/seed'),
      Rating = require('../models/rating'),
      Token = require('../models/token'),
      User = require('../models/user'),    
      db = require('../src/utils/db'),
      request = require('supertest'),
      app = require('../app');

const userOne = users[0];
const userTwo = users[1];
const tokenOne = tokens[0];
const qOne = questions[0];

describe('Auth routes', () => {

  beforeAll(() => {
    db.connect();
    db.initCollections();
    db.reset();
  });

  afterAll(db.disconnect);

  // create test user (creator)
  beforeEach(async() => {
      await Rating.deleteMany({});
      await User.deleteMany({});
      await Token.deleteMany({});
      await new User(userOne).save();
      await new User(userTwo).save();
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

  it('Should not be able to confirm existing user account when provided with an invalid token', async () => {
    await request(app).post('/auth/validate').send({
        email: userOne.email,
        token: "ThisTokenWillNeverExistEverEverEver"
    }).expect(400);
  });

  it(`Should not be able to sign-in existent user with another user's password`, async () => {
    await request(app).post('/auth/signin').send({
      email: userOne.email,
      password: userTwo.password
    }).expect(401);
  });

  it(`Should not confirm an user with another user's token`, async () => {
    await request(app).post('/auth/validate').send({
      email: userTwo.email,
      token: tokenOne.token
    }).expect(400);
    
    
  });


});



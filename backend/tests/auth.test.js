const {users} = require('../src/utils/seed'),
      Rating = require('../models/rating'),
      User = require('../models/user'),    
      db = require('../src/utils/db'),
      request = require('supertest'),
      app = require('../app');

const userOne = users[0];
const userTwo = users[1];
const tokenOne = userOne.tokens[0];

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
      await new User(userOne).save();
      await new User(userTwo).save();
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
      }).expect(400);
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

  it(`Should not signin user without token as confirmed`, async () => {
    await request(app).post('/auth/validate').send({
      email: userTwo.email
    }).expect(400);
  });

  


});



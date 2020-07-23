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
  // TEST CASES - POST /ratings 
  // ----------------------------------------------------------------------------

  it('should be able to post a rating', async () => {
    const response = await request(app)
                              .post('/ratings')
                              .send({
                                creatorId: userOne._id,
                                questionId: qOne.basic._id,
                                value: 3
                              });

    expect(response.status).toBe(201);
    // console.log(response);

    // additional assertions
    const rating = await Rating.findById(response.body.rating._id);

    expect(rating).not.toBeNull();
  });

  it('should fail to post a rating without a creatorId/questionId required fields', async () => {
    const response = await request(app)
                              .post('/ratings')
                              .send({
                                questionId: qOne.basic._id,
                                value: 3
                              });

    expect(response.status).toBe(500);
  });


  // ----------------------------------------------------------------------------
  // TEST CASES - GET /ratings/:id GET   :: TODO
  // ----------------------------------------------------------------------------


  // ----------------------------------------------------------------------------
  // TEST CASES - PUT /ratings/:id/edit   :: TODO
  // ----------------------------------------------------------------------------

});
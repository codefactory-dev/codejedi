const mongoose = require('mongoose'),
      request = require('supertest'),
      app = require('../app');

const User = require('../models/user');

const userOneId = new mongoose.Types.ObjectId;
const userOne = {
      _id: userOneId,
      firstname: 'Roberta',
      lastname: 'Mota',
      email: 'roberta.cmota@gmail.com',
      username: 'roberta.crmota',
      password: 'roberta.crmota123',
      qTrackSummary: {
          nbTracksPerType: {
              array: 0,
              string: 0,
              graph: 0
          },
          avgDurationPerType: {
              array: 0,
              string: 0,
              graph: 0
          },
          nbPDifficultyPerType: {
              array: 0,
              string: 0,
              graph: 0
          }
      }
};

describe('Ratings routes', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      bufferCommands: false,
      bufferMaxEntries: 0
    });
    db = mongoose.connection;
  });

  afterAll(async () => mongoose.disconnect());

  // create test user (creator)
  beforeEach(async() => {
      await User.deleteMany({});
      await new User(userOne).save();
  });


  // ----------------------------------------------------------------------------
  // TEST CASES - POST /ratings 
  // ----------------------------------------------------------------------------

  it('should be able to post a rating', async () => {
  });

  it('shoudl failt to post a rating without a creator', async () => {
    const response = await request(app)
                              .post('/ratings')
                              .send({
                                creatorId: userOneId,
                                value: 3
                              });

    expect(response.status).toBe(200);
  });

  it('shoudl failt to post a rating without a value', async () => {
  });


  // ----------------------------------------------------------------------------
  // TEST CASES - GET /ratings/:id GET
  // ----------------------------------------------------------------------------


  // ----------------------------------------------------------------------------
  // TEST CASES - PUT /ratings/:id/edit 
  // ----------------------------------------------------------------------------

  // it('should be able to get ratings', async () => {
  //   const response = await request(app)
  //     .get('/ratings')
  //     .send({
  //       title: "Dummy sample test",
  //       description: "This is just a dummy request to test ratings request"
  //     })

  //   expect(response.status).toBe(200);
  // });
});
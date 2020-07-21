const mongoose = require('mongoose'),
      request = require('supertest'),
      app = require('../app');

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


  it('should be able to get ratings', async () => {
    const response = await request(app)
      .get('/ratings')
      .send({
        title: "Dummy sample test",
        description: "This is just a dummy request to test ratings request"
      })

    expect(response.status).toBe(200);
  });
});
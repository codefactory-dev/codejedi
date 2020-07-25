const {users, questions, ratings} = require('../src/utils/seedDB'),
      QDetail = require('../models/qdetail'),
      Rating = require('../models/rating'),
      QBasic = require('../models/qbasic'),
      User = require('../models/user'),
      mongoose = require('mongoose'),
      request = require('supertest'),
      app = require('../app');

const qOne = questions[0], qTwo = questions[1],
      userOne = users[0], userTwo = users[1],
      ratingOne = ratings[0];


describe('Rating routes', () => {
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
      await QBasic.deleteMany({});
      await QDetail.deleteMany({});

      await new User(userOne).save();
      await new QBasic(qOne.basic).save();
      await new QDetail(qOne.detail).save();
  });


  // ----------------------------------------------------------------------------
  // TEST CASES - POST /users/:uid/questions/:qid/ratings 
  // ----------------------------------------------------------------------------
  it('should post a rating', async () => {
    const response = await request(app)
                              .post(`/users/${userOne._id}/questions/${qOne.basic._id}/ratings`)
                              .send({ value: 3 });

    expect(response.status).toBe(201); // success :: created


    // additional assertions
    const rating = await Rating.findById(response.body.rating._id);
    expect(rating).not.toBeNull();
  });

  it('should fail to post a rating with non-existing creatorId/questionId', async () => {
    const response = await request(app)
                              .post(`/users/${userTwo._id}/questions/${qOne.basic._id}/ratings`)
                              .send({ value: 3 });

    expect(response.status).toBe(400); // client error :: bad request

    const rating = await Rating.find();
    expect(rating).toHaveLength(0);
  });

  it('should fail to post a rating with invalid value', async () => {
    const response = await request(app)
                              .post(`/users/${userOne._id}/questions/${qOne.basic._id}/ratings`)
                              .send({ value: 6 });

    expect(response.status).toBe(400); // client error :: bad request

    const rating = await Rating.find();
    expect(rating).toHaveLength(0);
  });

  it('should fail to post a rating with missing required field (value)', async () => {
    const response = await request(app)
                              .post(`/users/${userOne._id}/questions/${qOne.basic._id}/ratings`);

    expect(response.status).toBe(400); // client error :: bad request

    const rating = await Rating.find();
    expect(rating).toHaveLength(0);
  });

  // ----------------------------------------------------------------------------
  // TEST CASES - GET /users/:uid/questions/:qid/ratings/:id 
  // ----------------------------------------------------------------------------
  it('should fetch a rating', async () => {
    await new Rating(ratingOne).save();

    const response = await request(app)
                              .get(`/users/${userOne._id}/questions/${qOne.basic._id}/ratings/${ratingOne._id}`);

    expect(response.status).toBe(201); // success :: created


    // additional assertions
    const rating = await Rating.findById(response.body.rating._id);
    expect(rating).not.toBeNull();
  });

  it('should not fetch other user/question rating', async () => {
    ratingOne.creatorId = userTwo._id;
    ratingOne.questionId = qOne.basic._id;

    await new User(userTwo).save();
    await new QBasic(qTwo.basic).save();
    await new QDetail(qTwo.detail).save();
    await new Rating(ratingOne).save();

    let response = await request(app)
                              .get(`/users/${userOne._id}/questions/${qOne.basic._id}/ratings/${ratingOne._id}`);

    expect(response.status).toBe(400); // client error :: bad request

    response = await request(app)
                              .get(`/users/${userTwo._id}/questions/${qTwo.basic._id}/ratings/${ratingOne._id}`);

    expect(response.status).toBe(400); // client error :: bad request
  });

  // ----------------------------------------------------------------------------
  // TEST CASES - PUT /users/:uid/questions/:qid/ratings/:id/edit
  // ----------------------------------------------------------------------------
  it('should update a rating', async () => {
    ratingOne.creatorId = userOne._id;
    ratingOne.questionId = qOne.basic._id;

    await new Rating(ratingOne).save();

    const response = await request(app)
                              .put(`/users/${userOne._id}/questions/${qOne.basic._id}/ratings/${ratingOne._id}/edit`)
                              .send({ value: 1 });

    expect(response.status).toBe(201); // success :: created


    // additional assertions
    const rating = await Rating.findById(ratingOne._id);
    expect(rating).not.toBeNull();
    expect(rating.value).toBe(1);
  });

  it('should fail to update a rating with invalid value', async () => {
    ratingOne.creatorId = userOne._id;
    ratingOne.questionId = qOne.basic._id;

    await new Rating(ratingOne).save();

    const response = await request(app)
                              .put(`/users/${userOne._id}/questions/${qOne.basic._id}/ratings/${ratingOne._id}/edit`)
                              .send({ value: -1 });

    expect(response.status).toBe(400); // client error :: bad request

    const rating = await Rating.findById(ratingOne._id);
    expect(rating).not.toBeNull();
    expect(rating.value).toBe(ratingOne.value);
  });

  it('should fail to update a rating with missing required field (value)', async () => {
    ratingOne.creatorId = userOne._id;
    ratingOne.questionId = qOne.basic._id;

    await new Rating(ratingOne).save();

    const response = await request(app)
                              .put(`/users/${userOne._id}/questions/${qOne.basic._id}/ratings/${ratingOne._id}/edit`);

    expect(response.status).toBe(400); // client error :: bad request

    const rating = await Rating.findById(ratingOne._id);
    expect(rating).not.toBeNull();
    expect(rating.value).toBe(ratingOne.value);
  });

  it('should fail to update a rating with non-existing creatorId/questionId', async () => {
    ratingOne.creatorId = userOne._id;
    ratingOne.questionId = qOne.basic._id;

    await new Rating(ratingOne).save();

    const updateValue = ((ratingOne.value + 1) % 4) + 1;
    const response = await request(app)
                              .put(`/users/${userTwo._id}/questions/${qOne.basic._id}/ratings/${ratingOne._id}/edit`)
                              .send({ value: updateValue });

    expect(response.status).toBe(400); // client error :: bad request

    const rating = await Rating.findById(ratingOne._id);
    expect(rating).not.toBeNull();
    expect(rating.value).toBe(ratingOne.value);
  });

  it('should fail to update other user/question rating', async () => {
    ratingOne.creatorId = userTwo._id;
    ratingOne.questionId = qOne.basic._id;

    await new User(userTwo).save();
    await new QBasic(qTwo.basic).save();
    await new QDetail(qTwo.detail).save();
    await new Rating(ratingOne).save();

    const updateValue = ((ratingOne.value + 1) % 4) + 1;

    let response = await request(app)
                              .put(`/users/${userOne._id}/questions/${qOne.basic._id}/ratings/${ratingOne._id}/edit`)
                              .send({ value: updateValue });

    expect(response.status).toBe(400); // client error :: bad request

    response = await request(app)
                              .put(`/users/${userTwo._id}/questions/${qTwo.basic._id}/ratings/${ratingOne._id}/edit`)
                              .send({ value: updateValue });

    expect(response.status).toBe(400); // client error :: bad request

    const rating = await Rating.findById(ratingOne._id);
    expect(rating).not.toBeNull();
    expect(rating.value).toBe(ratingOne.value);
  });
});
const {users, questions, ratings} = require('../src/utils/seed'),
      {addAvgRating} = require('../routers/utils'),
      QDetail = require('../models/qdetail'),
      Rating = require('../models/rating'),
      QBasic = require('../models/qbasic'),
      User = require('../models/user'),
      db = require('../src/utils/db'),
      request = require('supertest'),
      app = require('../app'),
      _ = require('lodash');

const qOne = questions[0], qTwo = questions[1],
      userOne = users[0], userTwo = users[1],
      ratingOne = ratings[0];


describe('Rating routes', () => {

  beforeAll(() => {
    db.connect();
    db.initCollections();
    db.reset();
  });

  afterAll(db.disconnect);

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

    let q = await QBasic.findById(qOne.basic._id);
    const value = 3;
    const prevAvgRating = q.avgRatings;
    const prevNbRating = q.nbRatings;
    const newAvgRating = addAvgRating(q, value);
    

    const response = await request(app)
                              .post(`/users/${userOne._id}/questions/${q._id}/ratings`)
                              .send({value});

    expect(response.status).toBe(201); // success :: created


    // expect new rating to be saved on the db
    const rating = await Rating.findById(response.body.rating._id);
    expect(rating).not.toBeNull();

    // expect user to have new rating
    const user = await User.findById(userOne._id);
    expect(_.findIndex(user.ratingIds, rating._id)).not.toBe(-1);

    // expect question avg/nb of ratings to be updated
    q = await QBasic.findById(qOne.basic._id);
    expect(parseFloat(q.nbRatings)).toBe(prevNbRating+1);
    expect(parseFloat(q.avgRatings)).toBe(newAvgRating);

    // expect question to have new rating
    const qd = await QDetail.findOne({basicsId: qOne.basic._id});
    expect(_.findIndex(qd.ratingIds, rating._id)).not.toBe(-1);
  });

  it('should fail to post a rating with non-existing creatorId/questionId', async () => {
    const response = await request(app)
                              .post(`/users/${userTwo._id}/questions/${qOne.basic._id}/ratings`)
                              .send({ value: 3 });

    expect(response.status).toBe(400); // client error :: bad request

    const rating = await Rating.find();
    expect(rating).toHaveLength(0);

    const user = await User.findById(userOne._id);
    expect(user.ratingIds).toHaveLength(0);
  });

  it('should fail to post a rating with invalid value', async () => {
    const response = await request(app)
                              .post(`/users/${userOne._id}/questions/${qOne.basic._id}/ratings`)
                              .send({ value: 6 });

    expect(response.status).toBe(400); // client error :: bad request

    const rating = await Rating.find();
    expect(rating).toHaveLength(0);

    const user = await User.findById(userOne._id);
    expect(user.ratingIds).toHaveLength(0);
  });

  it('should fail to post a rating with missing required field (value)', async () => {
    const response = await request(app)
                              .post(`/users/${userOne._id}/questions/${qOne.basic._id}/ratings`);

    expect(response.status).toBe(400); // client error :: bad request

    const rating = await Rating.find();
    expect(rating).toHaveLength(0);

    const user = await User.findById(userOne._id);
    expect(user.ratingIds).toHaveLength(0);
  });
  
  
  // ----------------------------------------------------------------------------
  // TEST CASES - GET /users/:uid/questions/:qid/ratings/:id 
  // ----------------------------------------------------------------------------
  
  it('should fetch a rating', async () => {
    await new Rating(ratingOne).save();

    const response = await request(app)
                              .get(`/users/${userOne._id}/questions/${qOne.basic._id}/ratings/${ratingOne._id}`);

    expect(response.status).toBe(200); // success :: ok


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
    ratingOne.value = 3;
    await new Rating(ratingOne).save();

    const response = await request(app)
                              .put(`/users/${userOne._id}/questions/${qOne.basic._id}/ratings/${ratingOne._id}/edit`)
                              .send({ value: 1 });

    expect(response.status).toBe(201); // success :: created

    // expect new rating's value to be saved on the db
    const rating = await Rating.findById(response.body.rating._id);
    expect(rating).not.toBeNull();
    expect(rating.value).toBe(1);

    // // expect user to have new rating
    // const user = await User.findById(userOne._id);
    // expect(_.findIndex(user.ratingIds, rating._id)).not.toBe(-1);

    // // expect question avg/nb of ratings to be updated
    // q = await QBasic.findById(qOne.basic._id);
    // expect(parseFloat(q.nbRatings)).toBe(prevNbRating+1);
    // expect(parseFloat(q.avgRatings)).toBe(newAvgRating);

    // // expect question to have new rating
    // const qd = await QDetail.findOne({basicsId: qOne.basic._id});
    // expect(_.findIndex(qd.ratingIds, rating._id)).not.toBe(-1);
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
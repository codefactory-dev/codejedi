const {generateQuestions, generateUsers, generateRatings} = require('../src/utils/seed'),
      {addAvgRating} = require('../routers/utils'),
      Rating = require('../models/rating'),
      Question = require('../models/question'),
      User = require('../models/user'),
      db = require('../src/utils/db'),
      request = require('supertest'),
      app = require('../app'),
      _ = require('lodash');


describe('Rating routes', () => {
  let users = [],
      questions = [],
      ratings = [];
      
  beforeAll(async () => {
    await db.connect();
    await db.initCollections();
    await db.reset();

    users = generateUsers(1);
    questions = generateQuestions(1, users);
    ratings = generateRatings(1, users, questions);
  });

  afterAll(db.disconnect);

  beforeEach(async() => {
      await Rating.deleteMany({});
      await User.deleteMany({});
      await Question.deleteMany({});

      await new User(users[0]).save();
      await new Question(questions[0]).save();
  });


  // ----------------------------------------------------------------------------
  // TEST CASES - POST /users/:uid/questions/:qid/ratings 
  // ----------------------------------------------------------------------------
  
  it('should post a rating', async () => {

    let q = await Question.findById(questions[0]._id);
    const value = 3;
    const prevAvgRating = q.avgRatings;
    const prevNbRating = q.nbRatings;
    const newAvgRating = addAvgRating(q, value);
    

    const response = await request(app)
                              .post(`/users/${users[0]._id}/questions/${q._id}/ratings`)
                              .send({value});

    expect(response.status).toBe(201); // success :: created


    // expect new rating to be saved on the db
    const rating = await Rating.findById(response.body.rating._id);
    expect(rating).not.toBeNull();

    // expect user to have new rating
    const user = await User.findById(users[0]._id);
    expect(_.findIndex(user.ratingIds, rating._id)).not.toBe(-1);

    // expect question avg/nb of ratings to be updated
    q = await Question.findById(questions[0]._id);
    expect(parseFloat(q.nbRatings)).toBe(prevNbRating+1);
    expect(parseFloat(q.avgRatings)).toBe(newAvgRating);
    
    // expect question to have new rating
    expect(_.findIndex(q.ratingIds, rating._id)).not.toBe(-1);
  });

  it('should fail to post a rating with non-existing creatorId/questionId', async () => {
    const otherUsers = generateUsers(1);

    const response = await request(app)
                              .post(`/users/${otherUsers[0]._id}/questions/${questions[0]._id}/ratings`)
                              .send({ value: 3 });

    expect(response.status).toBe(400); // client error :: bad request

    const rating = await Rating.find();
    expect(rating).toHaveLength(0);

    const user = await User.findById(users[0]._id);
    expect(user.ratingIds).toHaveLength(0);
  });

  it('should fail to post a rating with invalid value', async () => {
    const response = await request(app)
                              .post(`/users/${users[0]._id}/questions/${questions[0]._id}/ratings`)
                              .send({ value: 6 });

    expect(response.status).toBe(400); // client error :: bad request

    const rating = await Rating.find();
    expect(rating).toHaveLength(0);

    const user = await User.findById(users[0]._id);
    expect(user.ratingIds).toHaveLength(0);
  });

  it('should fail to post a rating with missing required field (value)', async () => {
    const response = await request(app)
                              .post(`/users/${users[0]._id}/questions/${questions[0]._id}/ratings`);

    expect(response.status).toBe(400); // client error :: bad request

    const rating = await Rating.find();
    expect(rating).toHaveLength(0);

    const user = await User.findById(users[0]._id);
    expect(user.ratingIds).toHaveLength(0);
  });
  
  
  // ----------------------------------------------------------------------------
  // TEST CASES - GET /users/:uid/questions/:qid/ratings/:id 
  // ----------------------------------------------------------------------------
  it('should fetch a rating', async () => {
    await new Rating(ratings[0]).save();

    const response = await request(app)
                              .get(`/users/${users[0]._id}/questions/${questions[0]._id}/ratings/${ratings[0]._id}`);

    expect(response.status).toBe(200); // success :: ok


    // additional assertions
    const rating = await Rating.findById(response.body.rating._id);
    expect(rating).not.toBeNull();
  });

  it('should not fetch other user/question rating', async () => {
    const otherUser = generateUsers(1);
    const otherQuestion = generateQuestions(1, users);

    ratings[0].creatorId = otherUser[0]._id;
    ratings[0].questionId = questions[0]._id;

    await new User(otherUser[0]).save();
    await new Question(otherQuestion[0]).save();
    await new Rating(ratings[0]).save();

    let response = await request(app)
                              .get(`/users/${users[0]._id}/questions/${questions[0]._id}/ratings/${ratings[0]._id}`);

    expect(response.status).toBe(400); // client error :: bad request

    response = await request(app)
                              .get(`/users/${otherUser[0]._id}/questions/${otherQuestion[0]._id}/ratings/${ratings[0]._id}`);

    expect(response.status).toBe(400); // client error :: bad request
  });
  
  // ----------------------------------------------------------------------------
  // TEST CASES - PUT /users/:uid/questions/:qid/ratings/:id/edit
  // ----------------------------------------------------------------------------
  
  it('should update a rating', async () => {
    ratings[0].creatorId = users[0]._id;
    ratings[0].questionId = questions[0]._id;
    ratings[0].value = 3;
    await new Rating(ratings[0]).save();

    const response = await request(app)
                              .put(`/users/${users[0]._id}/questions/${questions[0]._id}/ratings/${ratings[0]._id}/edit`)
                              .send({ value: 1 });

    expect(response.status).toBe(201); // success :: created

    // expect new rating's value to be saved on the db
    const rating = await Rating.findById(response.body.rating._id);
    expect(rating).not.toBeNull();
    expect(rating.value).toBe(1);
  });

  
  it('should fail to update a rating with invalid value', async () => {
    ratings[0].creatorId = users[0]._id;
    ratings[0].questionId = questions[0]._id;

    await new Rating(ratings[0]).save();

    const response = await request(app)
                              .put(`/users/${users[0]._id}/questions/${questions[0]._id}/ratings/${ratings[0]._id}/edit`)
                              .send({ value: -1 });

    expect(response.status).toBe(400); // client error :: bad request

    const rating = await Rating.findById(ratings[0]._id);
    expect(rating).not.toBeNull();
    expect(rating.value).toBe(ratings[0].value);
  });

  it('should fail to update a rating with missing required field (value)', async () => {
    ratings[0].creatorId = users[0]._id;
    ratings[0].questionId = questions[0]._id;

    await new Rating(ratings[0]).save();

    const response = await request(app)
                              .put(`/users/${users[0]._id}/questions/${questions[0]._id}/ratings/${ratings[0]._id}/edit`);

    expect(response.status).toBe(400); // client error :: bad request

    const rating = await Rating.findById(ratings[0]._id);
    expect(rating).not.toBeNull();
    expect(rating.value).toBe(ratings[0].value);
  });

  it('should fail to update a rating with non-existing creatorId/questionId', async () => {
    const otherUsers = generateUsers(1);

    ratings[0].creatorId = users[0]._id;
    ratings[0].questionId = questions[0]._id;

    await new Rating(ratings[0]).save();

    const updateValue = ((ratings[0].value + 1) % 4) + 1;
    const response = await request(app)
                              .put(`/users/${otherUsers[0]._id}/questions/${questions[0]._id}/ratings/${ratings[0]._id}/edit`)
                              .send({ value: updateValue });

    expect(response.status).toBe(400); // client error :: bad request

    const rating = await Rating.findById(ratings[0]._id);
    expect(rating).not.toBeNull();
    expect(rating.value).toBe(ratings[0].value);
  });

  it('should fail to update other user/question rating', async () => {
    const otherUsers = generateUsers(1);
    const otherQuestions = generateQuestions(1, users);

    ratings[0].creatorId = otherUsers[0]._id;
    ratings[0].questionId = questions[0]._id;

    await new User(otherUsers[0]).save();
    await new Question(otherQuestions[0]).save();
    await new Rating(ratings[0]).save();

    const updateValue = ((ratings[0].value + 1) % 4) + 1;

    let response = await request(app)
                              .put(`/users/${users[0]._id}/questions/${questions[0]._id}/ratings/${ratings[0]._id}/edit`)
                              .send({ value: updateValue });

    expect(response.status).toBe(400); // client error :: bad request

    response = await request(app)
                              .put(`/users/${otherUsers[0]._id}/questions/${otherQuestions[0]._id}/ratings/${ratings[0]._id}/edit`)
                              .send({ value: updateValue });

    expect(response.status).toBe(400); // client error :: bad request

    const rating = await Rating.findById(ratings[0]._id);
    expect(rating).not.toBeNull();
    expect(rating.value).toBe(ratings[0].value);
  });
});
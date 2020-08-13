const {generateUsers, generateQuestions} = require('../src/utils/seed'),
      {addAvgRating} = require('../routers/utils'),
      Question = require('../models/question'),
      User = require('../models/user'),
      db = require('../src/utils/db'),
      request = require('supertest'),
      app = require('../app'),
      _ = require('lodash');


describe('Rating routes', () => {
  let questions = [];
  let users = [];

  beforeAll(async() => {
    await db.connect();
    await db.initCollections();
    await db.reset();

    users = generateUsers(1);
    questions = generateQuestions(3, users);
  });

  afterAll(db.disconnect);

  beforeEach(async() => {
      await User.deleteMany({});
      await Question.deleteMany({});

      await new User(users[0]).save();
  });

  // -----------------------------------------------------------------------------
  // TEST CASES - GET (basic info) 10 questions sorted by update date
  // -----------------------------------------------------------------------------
  it('should fetch latest questions', async () => {
        //generate random data
        const questions = generateQuestions(20, users);    
        await Question.insertMany(questions);
    
        const response = await request(app).get(`/questions`);

        expect(response.status).toBe(200); // success :: created
    });


  // -----------------------------------------------------------------------------
  // TEST CASES - POST a new question  /users/:uid/questions
  // -----------------------------------------------------------------------------
  it('should post a question', async () => {
   const response = await request(app)
                             .post(`/users/${users[0]._id}/questions/`)
                             .send({
                                 title: '2Sum',
                                 difficulty: 'Medium',
                                 type: 'Array',
                                 description: 'Given an array of integers, return indices of the two numbers such that they add up to a specific target.'
                             });

   expect(response.status).toBe(201); // success :: created

  });

   // -----------------------------------------------------------------------------
   // TEST CASES - SHOW - get (all info) specific question  /users/:uid/questions/:id
   // -----------------------------------------------------------------------------
   it('should get all info of a question', async () => {
        await new Question(questions[0]).save();

        const response = await request(app)
                                .get(`/users/${users[0]._id}/questions/${questions[0]._id}`);

        expect(response.status).toBe(200); // success :: ok
   });

   // -----------------------------------------------------------------------------
   // TEST CASES - UPDATE - update a question  /users/:uid/questions/:id
   // -----------------------------------------------------------------------------
   it('should update a question', async () => {
        await new Question(questions[0]).save();

        const response = await request(app)
                                .put(`/users/${users[0]._id}/questions/${questions[0]._id}`)
                                .send({
                                    title: 'TwoSum',
                                    difficulty: 'Easy',
                                    type: 'Array',
                                    description: 'Given an array of integers, return indices of the two numbers such that they add up to a specific target.',
                                    solution: '2-pointer pattern (Accepted)'
                                });

        expect(response.status).toBe(200); // success :: ok
   });

   // -----------------------------------------------------------------------------
   // TEST CASES - DESTROY - delete question  /users/:uid/questions/:id
   // -----------------------------------------------------------------------------
   it('should delete a question', async () => {
        await new Question(questions[0]).save();

        const response = await request(app)
                                .delete(`/users/${users[0]._id}/questions/${questions[0]._id}`);

        expect(response.status).toBe(200); // success :: ok
    });
});
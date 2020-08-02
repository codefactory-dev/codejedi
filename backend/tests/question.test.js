const {users, questions, generateUsers, generateQuestions} = require('../src/utils/seed'),
      {addAvgRating} = require('../routers/utils'),
      QDetail = require('../models/qdetail'),
      QBasic = require('../models/qbasic'),
      User = require('../models/user'),
      db = require('../src/utils/db'),
      request = require('supertest'),
      app = require('../app'),
      _ = require('lodash');

const qOne = questions[0], qTwo = questions[1],
      userOne = users[0], userTwo = users[1];


describe('Rating routes', () => {

  beforeAll(() => {
    db.connect();
    db.initCollections();
    db.reset();
  });

  afterAll(db.disconnect);

  beforeEach(async() => {
      await User.deleteMany({});
      await QBasic.deleteMany({});
      await QDetail.deleteMany({});

      await new User(userOne).save();
  });

  // -----------------------------------------------------------------------------
  // TEST CASES - GET (basic info) 10 questions sorted by update date
  // -----------------------------------------------------------------------------
  it('should fetch latest questions', async () => {
        //generate random data
        const users = generateUsers(1);
        await new User(users[0]).save();

        const questions = generateQuestions(20, users);  
        const qbasics = [], qdetails = [];   
        questions.forEach(q => {
            qbasics.push(q.basic); 
            qdetails.push(q.detail);
        });       
        await QBasic.insertMany(qbasics);
        await QDetail.insertMany(qdetails);
    


        const response = await request(app).get(`/questions`);

        expect(response.status).toBe(200); // success :: created
    });


  // -----------------------------------------------------------------------------
  // TEST CASES - POST a new question  /users/:uid/questions
  // -----------------------------------------------------------------------------
  it('should post a question', async () => {
   const response = await request(app)
                             .post(`/users/${userOne._id}/questions/`)
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
        await new QBasic(qOne.basic).save();
        await new QDetail(qOne.detail).save();

        const response = await request(app)
                                .get(`/users/${userOne._id}/questions/${qOne.basic._id}`);

        expect(response.status).toBe(200); // success :: ok
   });

   // -----------------------------------------------------------------------------
   // TEST CASES - UPDATE - update a question  /users/:uid/questions/:id
   // -----------------------------------------------------------------------------
   it('should update a question', async () => {
        await new QBasic(qOne.basic).save();
        await new QDetail(qOne.detail).save();

        const response = await request(app)
                                .put(`/users/${userOne._id}/questions/${qOne.basic._id}`)
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
        await new QBasic(qOne.basic).save();
        await new QDetail(qOne.detail).save();

        const response = await request(app)
                                .delete(`/users/${userOne._id}/questions/${qOne.basic._id}`);

        expect(response.status).toBe(200); // success :: ok
    });
});
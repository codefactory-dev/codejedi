const {users, questions, generateComments, generateUsers, generateQuestions} = require('../src/utils/seed'),
      Rating = require('../models/rating'),
      User = require('../models/user'),
      Comment = require('../models/comment'),
      QBasic = require('../models/qbasic'),
      db = require('../src/utils/db'),
      request = require('supertest'),
      casual = require('casual'),
      app = require('../app');

const userOne = users[0];
const userAdmin = users[2];
var questionsBasicList;

//TODO: when deleting a comment
//From the model:
//a USER has comments[objectId];
//a QUESTIONBASIC has lastCommentDescription
//a QUESTIONDETAILS has comments[objectId]
//
describe('Comment routes', () => {
  
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
      
      //generate data
      const users = generateUsers(3);
      const questions = generateQuestions(2, users);
      const qbasics = []; 
      questions.forEach(q => {
          qbasics.push(q.basic); 
      });       
      questionsBasicList = await QBasic.insertMany(qbasics);

      
      await new User(users[0]).save();

      const comments = generateComments(20, users, questions);     
      await Comment.insertMany(comments);
      
  });



  // ----------------------------------------------------------------------------
  // TEST CASES - INDEX (GET /comments)
  // ----------------------------------------------------------------------------
  it('should be able to get all comments', async () => {
    await request(app).get('/comments').send().expect(200)
  });


  // ----------------------------------------------------------------------------
  // TEST CASES - NEW (GET /comments/:id)
  // ----------------------------------------------------------------------------
  it.skip('should be able to get a form to create a new comment', async () => {
    await request(app).get('/comments/new').send().expect(200)
  });

  // ----------------------------------------------------------------------------
  // TEST CASES - CREATE (POST /comments)
  // ----------------------------------------------------------------------------
  it('should be able to create a new comment', async () => {
    const date = new Date();

    const someQuestionBasic = casual.random_element(questionsBasicList);
    await request(app).post('/comments').send({
            questionId: someQuestionBasic._id,
            creatorId: userOne._id,
            description: casual.sentences(3),
            creationDate: date,
            lastUpdate: date,

        }).expect(201)
  });

  // ----------------------------------------------------------------------------
  // TEST CASES - SHOW (GET /comments/:id)
  // ----------------------------------------------------------------------------
  it.skip(`should be able to get all the specified comment's info`, async () => {
    await request(app).get('/comments/'+userOne._id).send().expect(200)
  });

  // ----------------------------------------------------------------------------
  // TEST CASES - EDIT (GET /comments/:id/edit)
  // ----------------------------------------------------------------------------
  it.skip('should be able to get specific comment info to edit', async () => {
    await request(app).get('/comments/:id/edit').send().expect(200)
  });

  // ----------------------------------------------------------------------------
  // TEST CASES - UPDATE (PATCH /comments/:id)
  // ----------------------------------------------------------------------------
  it.skip('should be able to update the comment', async () => {
    const response = await request(app).patch('/comments/'+userOne._id).send();
    expect(response.status).toBe(200);
  })

  // ----------------------------------------------------------------------------
  // TEST CASES - DESTROY (DELETE /comments/:id)
  // ----------------------------------------------------------------------------
  it.skip('should be able to delete the comment', async () => {
    const response = await request(app).delete('/comments/'+userOne._id).send();
    expect(response.status).toBe(200);
  })

  it.skip('Should not be able to create a new comment with the same email', async () => {
    await request(app).post('/comments').send({
            name: 'Another Person',
            email: userOne.email,
            username: 'figarofi',
            password: 'somep4ssw0rd',
            validated: false
        }).expect(409)
  });

});
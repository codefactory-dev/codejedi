const {users, questions, generateComments, generateUsers, generateQuestions} = require('../src/utils/seed'),
      Rating = require('../models/rating'),
      User = require('../models/user'),
      Comment = require('../models/comment'),
      QBasic = require('../models/qbasic'),
      QDetail = require('../models/qdetail'),
      db = require('../src/utils/db'),
      mongoose = require('mongoose'),
      request = require('supertest'),
      casual = require('casual'),
      app = require('../app');

var questionsBasicList, questionDetailsList;

//TODO: when deleting a comment
//From the model:
//a USER has comments[objectId];
//a QUESTIONBASIC has lastCommentDescription
//a QUESTIONDETAILS has comments[objectId]


describe('Comment routes', () => {
  
  beforeAll(async (done) => {
      await db.connect();
      await db.initCollections();
      await db.reset();
      done();
  });

  afterAll(db.disconnect);

  // create test user (creator)
  beforeEach( async(done) => {
      await User.deleteMany({});
      await Comment.deleteMany({});
      await QBasic.deleteMany({});
      await QDetail.deleteMany({});
      
      //generate data
      const users = generateUsers(3);
      const seedQuestions = generateQuestions(2, users);  
      const qbasics = [], qdetails = [];   
      seedQuestions.forEach(q => {
            qbasics.push(q.basic); 
            qdetails.push(q.detail);
      });      

      let i;
      try{
        await QBasic.insertMany(qbasics);
        await QDetail.insertMany(qdetails);
        const allQbasics = await QBasic.find({});      
      } catch(e){
        console.log("Error saving qbasic/qdetails"+e.toString()+" ====> For loop ID: "+i);
      }
      

      var comments;
      try{
        await User.insertMany(users);
        const seedComments = generateComments(7, users, seedQuestions);     
        await Comment.insertMany(seedComments);
        comments = await Comment.find();
      } catch(e){
        console.log("Error creating seed comments: "+e.toString());
      }

      for(let i=0;i<comments.length;i++)
      {
        try{
          var comment = comments[i];
          const user = await User.findById(comment.creatorId);
          user.commentIds.addToSet(comment._id);
          await user.save();
        } catch(e){
          console.log("Error adding commentIds to user");
        }
      }

      for (const comment of comments) {
        //Do somethign with the comment
        try{
          var qBasicCommentBelongsTo = await QBasic.findById(comment.questionId);
          var qDetailCommentBelongsTo = await QDetail.findById(qBasicCommentBelongsTo.detailsId);
          await qDetailCommentBelongsTo.commentIds.addToSet(comment._id);
          await qDetailCommentBelongsTo.save();
        } catch(e){
          console.log("Error: "+e.toString()+" ===> in Comment of id "+comment._id);
        }
      }
      console.log("Finished");
      done();
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

    const allQbasics = await QBasic.find({});   
    const someQuestionBasic = casual.random_element(allQbasics);
    const user = await User.findOne();
    await request(app).post('/comments').send({
            questionId: someQuestionBasic._id,
            creatorId: user._id,
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
  it.only('should be able to update the comment', async () => {
    const comment = await Comment.findOne({});
    const response = await request(app)
                              .patch('/comments/'+comment._id)
                              .send({
                                  description: 'This is a new Description',
                                  reply: {
                                    description: 'I modified the reply !'                                    
                                  }
                              });
    expect(response.status).toBe(200);
  })

  // ----------------------------------------------------------------------------
  // TEST CASES - DESTROY (DELETE /comments/:id)
  // ----------------------------------------------------------------------------
  it('should be able to delete the comment and all references to it', async () => {
    
    const comment = await Comment.findOne({});
    const response = await request(app).delete('/comments/'+comment._id).send();

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
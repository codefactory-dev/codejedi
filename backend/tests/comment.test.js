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


function createAndSave(model){

}



describe('Comment routes', () => {
  
  beforeAll(() => {
      db.connect();
      db.initCollections();
      db.reset();
  });

  afterAll(db.disconnect);

  // create test user (creator)
  beforeEach(async() => {
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

      for(let i=0;i<qbasics.length;i++)
      {
        var qbasic = new QBasic(qbasics[i]);
        try{
          let savedQbasic = await qbasic.save(); //when fail its goes to catch
        }
        catch(e)
        {
          console.log("Error saving qBasic"+e.toString());
        }
      }

      for(let i=0;i<qdetails.length;i++)
      {
        var qdetail = new QDetail(qdetails[i]);
        try{
          let savedQdetail = await qdetail.save(); //when fail its goes to catch
        }
        catch(e)
        {
          console.log("Error saving qDetail"+e.toString());
        }
      }

      var comments;
      try{
        for(let i=0;i<users.length;i++)
        {
          await new User(users[i]).save();
        }
        const seedComments = generateComments(7, users, seedQuestions);     
        for(let i=0;i<seedComments.length;i++)
        {
          await new Comment(seedComments[i]).save();
        }
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


      try{
        const allQbasics = await QBasic.find({});
      } catch(e){
        console.log("Error fetching qBasics: "+e.toString());
      }

      for (const comment of comments) {
        //Do somethign with the comment
        try{
          var qBasicCommentBelongsTo = await QBasic.findById(comment.questionId);
          var qDetailCommentBelongsTo = await QDetail.findById(qBasicCommentBelongsTo.detailsId);
          await qDetailCommentBelongsTo.commentIds.addToSet(comment._id);
          console.log("ADDED comment Id "+comment._id+" to qDetails "+qDetailCommentBelongsTo._id);
          await qDetailCommentBelongsTo.save();
        } catch(e){
          console.log("Error: "+e.toString()+" ===> in Comment of id "+comment._id);
        }
      }
      console.log("Finished");
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
    const user = User.findOne();
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
  it.skip('should be able to update the comment', async () => {
    const response = await request(app).patch('/comments/'+userOne._id).send();
    expect(response.status).toBe(200);
  })

  // ----------------------------------------------------------------------------
  // TEST CASES - DESTROY (DELETE /comments/:id)
  // ----------------------------------------------------------------------------
  it('should be able to delete the comment and all references to it', async () => {
    
    const comment = Comment.findOne({});
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
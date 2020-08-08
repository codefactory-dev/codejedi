const {users, questions, qtracks, generateUsers, generateQuestions, generateQTracks} = require('../src/utils/seed'),
      QDetail = require('../models/qdetail'),    
      QBasic = require('../models/qbasic'),
      QTrack = require('../models/qtrack'),
      User = require('../models/user'),
      db = require('../src/utils/db'),
      mongoose = require('mongoose'),
      request = require('supertest'),
      app = require('../app');

describe('QTrack routes', () => {
    let users;
    let questions;
    let qtracks;

    beforeAll(() => {
      db.connect();
      db.initCollections();
      db.reset();

      users = generateUsers(2);
      questions = generateQuestions(2, users);
      qtracks = generateQTracks(3, users, questions);
    });

    afterAll(db.disconnect);
  
    beforeEach(async() => {
        await db.reset();

        // await QTrack.deleteMany({});
        // await User.deleteMany({});
        // await QBasic.deleteMany({});
        // await QDetail.deleteMany({});
  
        // await new User(userOne).save();
        // await new QBasic(qOne.basic).save();
        // await new QDetail(qOne.detail).save();
    });

  // PREFIX: /users/:uid/qtracks

  // ----------------------------------------------------------------------------
  // TEST CASES - GET all qtracks      /users/:uid/qtracks
  // ----------------------------------------------------------------------------
  // it('should fetch qtracks', async () => {
  //   // qtrackOne.creatorId = userOne._id;
  //   // qtrackTwo.creatorId = userOne._id;

  //   // await new QTrack(qtrackOne).save();
  //   // await new QTrack(qtrackTwo).save();

  //   // const response = await request(app).get(`/users/${userOne._id}/qtracks`);

  //   // expect(response.status).toBe(200); // success :: ok

  //   // console.log(response.qtracks);
  //   // // additional assertions
  //   // // const rating = await Rating.findById(response.body.rating._id);
  //   // // expect(rating).not.toBeNull();
  // });

  // ----------------------------------------------------------------------------
  // TEST CASES - POST new qtrack  /users/:uid/qtracks
  // ----------------------------------------------------------------------------
  it('should post a qtrack', async () => {
    let qbasics = [], qdetails = [];
    questions.forEach(q => {
      qbasics.push(q.basic);
      qdetails.push(q.detail);
    });

    await User.insertMany(users);
    await QBasic.insertMany(qbasics);
    await QDetail.insertMany(qdetails);

    for(let i = 0; i < qtracks.length; i++){
      const {creatorId, questionId, perceivedDifficulty, solved, duration} = qtracks[i];
      const response = await request(app)
                                .post(`/users/${creatorId}/qtracks`)
                                .send({
                                  questionId,
                                  perceivedDifficulty,
                                  solved,
                                  duration 
                                });

      expect(response.status).toBe(201); // success :: created
    }
  });

  // ----------------------------------------------------------------------------
  // TEST CASES - SHOW - get qtrack info       /users/:uid/qtracks/:id
  // ----------------------------------------------------------------------------
  // it('should fetch a qtrack', async () => {
  //   await new QTrack(qtrackOne).save();

  //   const response = await request(app).get(`/users/${userOne._id}/qtracks/${qtrackOne._id}`);

  //   console.log(response.body);
  //   expect(response.status).toBe(200); // success :: ok
  // });

  // ----------------------------------------------------------------------------
  // TEST CASES - UPDATE - update qtrack's info    /users/:uid/qtracks/:id
  // ----------------------------------------------------------------------------

  // ----------------------------------------------------------------------------
  // TEST CASES - DELETE - delete qtrack       /users/:uid/qtracks/:id
  // ----------------------------------------------------------------------------

  // ----------------------------------------------------------------------------
  // TEST CASES - POST new qtrack  /users/:uid/qtracks
  // ----------------------------------------------------------------------------
});
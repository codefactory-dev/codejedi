const {users, questions, qtracks, generateUsers, generateQuestions, generateQTracks} = require('../src/utils/seed'),
      Question = require('../models/question'),
      QTrack = require('../models/qtrack'),
      User = require('../models/user'),
      db = require('../src/utils/db'),
      mongoose = require('mongoose'),
      request = require('supertest'),
      app = require('../app');

describe('QTrack routes', () => {
    let users = [];
    let questions = [];
    let qtracks = [];

    beforeAll(async () => {
      await db.connect();
      await db.initCollections();
      await db.reset();

      users = generateUsers(2);
      questions = generateQuestions(2, users);
      qtracks = generateQTracks(3, users, questions);
    });

    afterAll(db.disconnect);
  
    beforeEach(async() => {
        await db.reset();
    });

  // PREFIX: /users/:uid/qtracks

  // ----------------------------------------------------------------------------
  // TEST CASES - GET all qtracks      /users/:uid/qtracks
  // ----------------------------------------------------------------------------
  it('should fetch qtracks', async () => {
    await User.insertMany(users);
    await Question.insertMany(questions);
    
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

    const response = await request(app).get(`/users/${qtracks[0].creatorId}/qtracks`);
    expect(response.status).toBe(200); // success :: ok
  });

  // ----------------------------------------------------------------------------
  // TEST CASES - POST new qtrack  /users/:uid/qtracks
  // ----------------------------------------------------------------------------
  it('should post a qtrack', async () => {
    await User.insertMany(users);
    await Question.insertMany(questions);

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
  it('should fetch a qtrack', async () => {
    await User.insertMany(users);
    await Question.insertMany(questions);

    await new QTrack(qtracks[0]).save();

    const response = await request(app).get(`/users/${qtracks[0].creatorId}/qtracks/${qtracks[0]._id}`);

    expect(response.status).toBe(200); // success :: ok
  });

  // ----------------------------------------------------------------------------
  // TEST CASES - UPDATE - update qtrack's info    /users/:uid/qtracks/:id
  // ----------------------------------------------------------------------------
  it('should update a qtrack', async () => {
    await User.insertMany(users);
    await Question.insertMany(questions);
    
    const qtracksDB = [];
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
      qtracksDB.push(response.body.qtrack);
    }

    async function wait(ms) {
      return new Promise(resolve => {
        setTimeout(resolve, ms);
      });
    }

    async function doRequest() {
        await wait(2000);
      
        const response = await request(app)
                            .put(`/users/${qtracksDB[0].creatorId}/qtracks/${qtracksDB[0]._id}`)
                            .send({
                              perceivedDifficulty: "Medium",
                              solved: true,
                              duration: 100,
                            });

        expect(response.status).toBe(200); // success :: ok
    }  

    await doRequest();
  });

  // ----------------------------------------------------------------------------
  // TEST CASES - DELETE - delete qtrack       /users/:uid/qtracks/:id
  // ----------------------------------------------------------------------------
  it('should delete a qtrack', async () => {
    await User.insertMany(users);
    await Question.insertMany(questions);
    
    const qtracksDB = [];
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

      qtracksDB.push(response.body.qtrack);
    }
    
    const response2 = await request(app).delete(`/users/${qtracksDB[0].creatorId}/qtracks/${qtracksDB[0]._id}`);
    expect(response2.status).toBe(200); // success :: ok
  });
});
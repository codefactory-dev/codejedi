const {users, questions, qtracks} = require('../src/utils/seed'),
      QDetail = require('../models/qdetail'),    
      QBasic = require('../models/qbasic'),
      QTrack = require('../models/qtrack'),
      User = require('../models/user'),
      db = require('../src/utils/db'),
      mongoose = require('mongoose'),
      request = require('supertest'),
      app = require('../app');

const qOne = questions[0],       qTwo = questions[1],
      userOne = users[0],        userTwo = users[1],
      qtrackOne = qtracks[0],    qtrackTwo = qtracks[1];

describe('QTrack routes', () => {

    beforeAll(() => {
      db.connect();
      db.initCollections();
      db.reset();
    });

    afterAll(db.disconnect);
  
    beforeEach(async() => {
        await QTrack.deleteMany({});
        await User.deleteMany({});
        await QBasic.deleteMany({});
        await QDetail.deleteMany({});
  
        await new User(userOne).save();
        await new QBasic(qOne.basic).save();
        await new QDetail(qOne.detail).save();
    });

  // ----------------------------------------------------------------------------
  // TEST CASES - GET /users/:uid/qtracks
  // ----------------------------------------------------------------------------
  it('should fetch qtracks', async () => {
    // qtrackOne.creatorId = userOne._id;
    // qtrackTwo.creatorId = userOne._id;

    // await new QTrack(qtrackOne).save();
    // await new QTrack(qtrackTwo).save();

    // const response = await request(app).get(`/users/${userOne._id}/qtracks`);

    // expect(response.status).toBe(200); // success :: ok

    // console.log(response.qtracks);
    // // additional assertions
    // // const rating = await Rating.findById(response.body.rating._id);
    // // expect(rating).not.toBeNull();
  });

  // ----------------------------------------------------------------------------
  // TEST CASES - POST /users/:uid/qtracks
  // ----------------------------------------------------------------------------
  it('should post a qtrack', async () => {
  //   const response = await request(app)
  //                             .post(`/users/${userOne._id}/qtracks`)
  //                             .send({
  //                               questionId: qOne.basic._id,
  //                               perceivedDifficulty: "Medium",
  //                               solved: false,
  //                               duration: 35,
  //                             });

  //   expect(response.status).toBe(201); // success :: created


  //   // additional assertions
  //   const qtrack = await QTrack.findById(response.body.qtrack._id);
  //   expect(qtrack).not.toBeNull();

  //   const user = await User.findById(userOne._id);
  //   expect(user.qTrackIds).toHaveLength(1);
  //   expect(user.qTrackIds[0]._id).toEqual(qtrack._id);
  });
});
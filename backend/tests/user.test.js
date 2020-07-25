const mongoose = require('mongoose'),
      request = require('supertest'),
      app = require('../app');

const {users, questions} = require('../src/utils/seedDB');
const Rating = require('../models/rating'),
      User = require('../models/user');

const userOne = users[0];
const qOne = questions[0];

describe('Ratings routes', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      bufferCommands: false,
      bufferMaxEntries: 0
    });
    db = mongoose.connection;

    console.log(`connected to ${process.env.MONGODB_URL}`);
  });

  afterAll(async () => mongoose.disconnect());

  // create test user (creator)
  beforeEach(async() => {
      await Rating.deleteMany({});
      await User.deleteMany({});
      await new User(userOne).save();
  });



  // ----------------------------------------------------------------------------
  // TEST CASES - INDEX (GET /users)
  // ----------------------------------------------------------------------------
  it('should be able to get all users', async () => {
    await request(app).get('/users').send().expect(201)
  });


  // ----------------------------------------------------------------------------
  // TEST CASES - NEW (GET /users/:id)
  // ----------------------------------------------------------------------------
  it.skip('should be able to get a form to create a new user', async () => {
    await request(app).get('/users/new').send().expect(200)
  });

  // ----------------------------------------------------------------------------
  // TEST CASES - CREATE (POST /users)
  // ----------------------------------------------------------------------------
  it('should be able to create a new user', async () => {
    await request(app).post('/users').send({
            name: 'Jeff Zigzig',
            email: 'testing@gmail.com',
            username: 'jeffzigzig20',
            password: 'co0lp4$$'
        }).expect(201)
  });

  // ----------------------------------------------------------------------------
  // TEST CASES - SHOW (GET /users/:id)
  // ----------------------------------------------------------------------------
  it(`should be able to get all the specified user's info`, async () => {
    await request(app).get('/users/'+userOne._id).send().expect(200)
  });

  // ----------------------------------------------------------------------------
  // TEST CASES - EDIT (GET /users/:id/edit)
  // ----------------------------------------------------------------------------
  it.skip('should be able to get specific user info to edit', async () => {
    await request(app).get('/users/:id/edit').send().expect(200)
  });

  // ----------------------------------------------------------------------------
  // TEST CASES - UPDATE (PATCH /users/:id)
  // ----------------------------------------------------------------------------
  it('should be able to update the user', async () => {
    const response = await request(app).patch('/users/'+userOne._id).send();
    expect(response.status).toBe(200);
  })

  // ----------------------------------------------------------------------------
  // TEST CASES - DESTROY (DELETE /users/:id)
  // ----------------------------------------------------------------------------
  it('should be able to delete the user', async () => {
    const response = await request(app).delete('/users/'+userOne._id).send();
    expect(response.status).toBe(200);
  })

  
    
  

  

  

});
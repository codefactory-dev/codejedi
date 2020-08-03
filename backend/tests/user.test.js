const {users, questions} = require('../src/utils/seed'),
      Rating = require('../models/rating'),
      User = require('../models/user'),
      db = require('../src/utils/db'),
      request = require('supertest'),
      app = require('../app');

const userOne = users[0];
const userAdmin = users[2];
const qOne = questions[0];

describe('User routes', () => {
  
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
  });



  // ----------------------------------------------------------------------------
  // TEST CASES - INDEX (GET /users)
  // ----------------------------------------------------------------------------
  it('should be able to get all users', async () => {
    await request(app).get('/users').send().expect(200)
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
            password: 'co0lp4$$',
            validated: false
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

  it('Should not be able to create a new user with the same email', async () => {
    await request(app).post('/users').send({
            name: 'Another Person',
            email: userOne.email,
            username: 'figarofi',
            password: 'somep4ssw0rd',
            validated: false
        }).expect(409)
  });
  
  it('Should not be able to create a new user with the same username', async () => {

    await request(app).post('/users').send({
            name: 'Another Person',
            email: 'someemail@gmail.com',
            username: userOne.username,
            password: 'somep4ssw0rd',
            validated: false
        }).expect(409)
  });
    
  describe('routes exclusive to signed admins', () => {
    
    beforeEach(async() => {
      await new User(userAdmin).save();
      const response = await request(app).post('/auth/signin').send({
        email: userAdmin.email,
        password: userAdmin.password
      });
      expect(response.status).toBe(200);
    });
    
    
    it('Should delete another user', async () => {
      const response = await request(app).delete('/users/'+userOne._id).send();
      expect(response.status).toBe(200);
    });
    

  });
  
  describe('routes where the user is guaranteed NOT to be an ADMIN', () => { 
    beforeEach(async() => {
      const response = await request(app).post('/auth/signin').send({
        email: userOne.email,
        password: userOne.password
      });
      expect(response.status).toBe(200);
    });

    it('Should NOT delete another user', async () => {
      const response = await request(app).delete('/users/'+userOne._id).send();
      expect(response.status).toBe(200);
    });

  });
  

});
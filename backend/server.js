require('dotenv').config()

const serverless = require('serverless-http'),
      bodyParser = require('body-parser'),
      { Console } = require('console'),
      mongoose = require('mongoose'),
      express = require('express'),
      router = express.Router(),
      axios = require('axios'),
      cors = require('cors'),
      app = express();

// --------------------------------------------------------------------
// APP CONFIG
// --------------------------------------------------------------------

const local = process.env.LOCAL_SERVER || false;
const proxy = local ? '' : '/.netlify/functions/server/api';

app.use(cors())
   .use(bodyParser.json({limit: '50mb'}))
   .use(bodyParser.urlencoded({limit: '50mb', extended: true }))
   .use(proxy, router);

   
// --------------------------------------------------------------------
// MONGODB/MONGOOSE
// --------------------------------------------------------------------
const QDifficulty = require('./models/qdifficulty');
const Comment = require('./models/comment');
const QDetail = require('./models/qdetail');
const QBasic = require('./models/qbasic');
const Rating = require('./models/rating');
const QTrack = require('./models/qtrack');
const QType = require('./models/qtype');
const User = require('./models/user');

// temp files
const Editor = require('./models/editor');
const Img = require('./models/img');
const Code = require('./models/code');

const resetDB = require('./resetDB');
resetDB();

const dbName = "codefactory-database";
const MONGODB_URL = process.env.MONGODB_URL || `mongodb://localhost:27017/${dbName}`;

mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    bufferCommands: false,
    bufferMaxEntries: 0
})
.then(()=> console.log("connected to URL " + MONGODB_URL))
.catch((err) => console.log("Error on db connection: " + err.message));

// --------------------------------------------------------------------
// ROUTES
// --------------------------------------------------------------------

// POST code
router.post('/codes', async (req,res) => {
  console.log(`REQUEST :: create code  ${req.body.mode}`);
  console.log(req.body);

  const newCode = {
    mode: req.body.mode,
    text: req.body.text
  };


  await Code.create(newCode)
          .then((resolve) => {
            console.log(`STATUS :: Success`);
            console.log(resolve);
            res.status(201).send(newCode);
          })
        .catch((e) => {
          console.error(`STATUS :: Ops.Something went wrong.`);
          res.status(500).json({
            error: true,
            message: e.toString()
          });
        });
});

// POST user photo
router.post('/uploadPhoto', async(req, res) => {
  console.log(`REQUEST :: create user photo`);
  // console.log(req.body.img)

  const newImg = {
    data: req.body.img
  }

  await Img.create(newImg)
    .then((resolve) => {
      console.log(`STATUS :: Success`);
      res.status(201).send({buffer: newImg.data});
    })
    .catch((e) => {
      console.error(`STATUS :: Ops.Something went wrong.`);
      res.status(500).json({
        error: true,
        message: e.toString()
      });
  });
});

// GET rich-text
router.get('/editors', async (req,res) => {
  try{
    const editors = await Editor.find({});
    return res.status(201).send(editors);
  } catch(error) {
    return res.status(500).json({
      error: true,
      message: e.toString()
    });
  }
});

// POST rich-text
router.post('/editors', async (req,res) => {
  console.log(`REQUEST :: create editor  ${req.body.description}`);

  const newEditor = {
    description: req.body.description
  };


  await Editor.create(newEditor)
          .then((resolve) => {
            console.log(`STATUS :: Success`);
            console.log(resolve);
            res.status(201).send(newEditor);
          })
        .catch((e) => {
          console.error(`STATUS :: Ops.Something went wrong.`);
          res.status(500).json({
            error: true,
            message: e.toString()
          });
        });
});


// GET method route
router.get('/users', async (req,res) => {
  console.log("will try to get users");
  try{
    const users = await User.find({})
    return res.send(users)
  } catch(error) {
    return res.status(500).json({
      error: true,
      message: e.toString()
    });
  }
})

// POST method route
router.post('/users', async (req,res) => {
  console.log(`REQUEST :: create user  ${req.body.name}`);

  const [firstname, lastname] = req.body.name.split(' ');
  const newUser = {
    firstname,
    lastname,
    email: `${firstname}@gmail.com`,
    username: firstname,
    password: `${lastname}123`,
    qTrackSummary: {
      nbTracksPerType: {
        'Array': 0,
        'String': 0,
        'Tree': 0
      },
      avgDurationPerType: {
        'Array': 0,
        'String': 0,
        'Tree': 0
      },
      nbPDifficultyPerType: {
        'Array': 0,
        'String': 0,
        'Tree': 0
      }
    }
  };


  await User.create(newUser)
          .then((resolve) => {
            console.log(`STATUS :: Success`);
            console.log(resolve);
            res.status(201).send(newUser);
          })
        .catch((e) => {
          console.error(`STATUS :: Ops.Something went wrong.`);
          res.status(500).json({
            error: true,
            message: e.toString()
          });
        });
});

// API calls
router.get('/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

router.post('/compile', async (req,res) => {
  const payload = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': 'Token '+process.env.GLOT_IO_TOKEN
  }
  console.log("these are the headers: ");
  for (key in payload){
    console.log( key + ": " + payload[key]);
  }
  const body = {
    "files": [
        {
            "name": "main.js", 
            "content": req.body
        }
    ]
  }
  try{
    const result = await axios({
      method: 'post',
      url: 'https://run.glot.io/languages/javascript/latest',
      data: body,
      headers: payload
    });
    console.log(result);
    res.status(200).send(result.data);
  } catch(e){
    console.log("error "+e);
    res.status(500).send(e.message);
  }
  
})


// --------------------------------------------------------------------
// SERVER LISTENER
// --------------------------------------------------------------------

// NOT NEEDED WITH NETLIFY
if (local) app.listen(3000, () => console.log('Example app listening on port 3000!'));

// --------------------------------------------------------------------
// SERVELESS SETUP
// --------------------------------------------------------------------

module.exports = app;
if (!local) module.exports.handler = serverless(app);
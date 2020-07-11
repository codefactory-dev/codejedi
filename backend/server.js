require('dotenv').config()

const bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      express = require('express'),
      multer = require("multer"),
      fs = require('fs'),
      app = express();

// --------------------------------------------------------------------
// APP CONFIG
// --------------------------------------------------------------------

app.use(bodyParser.json())

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
const Editor = require('./models/editor');
const Img = require('./models/img');

const resetDB = require('./resetDB');
resetDB();


const MONGODB_URL = process.env.MONGODB_URL || "mongodb://localhost:27017/codefactory-database";
const upload = multer();

mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
.catch((err) => {
  console.log("Error on db connection: " + err.message);
});

// --------------------------------------------------------------------
// ROUTES
// --------------------------------------------------------------------

// GET profile pictures
app.get('/profilepics', async (req,res) => { 
    res.status(201).send("TODO");
});


// POST profile picture
app.post('/profilepics', upload.single('profilepic'), async (req, res) => {
  console.log(`REQUEST :: create profile picture`);
  console.log(req.file);
  console.log(upload);
  await Img.create(req.file)
          .then((resolve) => {
              console.log(`STATUS :: Success`);  
              // res.contentType(req.file.mimetype);
              // res.status(201).send(req.file.buffer);
              res.status(201).send(req.file.buffer.toString('base64'));      
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
app.get('/editors', async (req,res) => {
  try{
    const editors = await Editor.find({});
    return res.send(editors);
  } catch(error) {
    return res.status(500).json({
      error: true,
      message: e.toString()
    });
  }
});

// POST rich-text
app.post('/editors', async (req,res) => {
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
app.get('/users', async (req,res) => {
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
app.post('/users', async (req,res) => {
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


// --------------------------------------------------------------------
// SERVER LISTENER
// --------------------------------------------------------------------

app.listen(3000, () =>
  console.log('Example app listening on port 3000!')
);

require('dotenv').config()

const GridFsStorage = require('multer-gridfs-storage'),
      serverless = require('serverless-http'),
      bodyParser = require('body-parser'),
      { Console } = require('console'),
      MongoClient = require('mongodb'),
      Grid = require('gridfs-stream'),
      mongoose = require('mongoose'),
      express = require('express'),
      multer = require("multer"),
      // crypto = require('crypto'),
      router = express.Router(),
      // fs = require('fs'),
      app = express();

// --------------------------------------------------------------------
// APP CONFIG
// --------------------------------------------------------------------

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
const 
resetDB();

const dbName = "codefactory-database";
const MONGODB_URL = process.env.MONGODB_URL || `mongodb://localhost:27017/${dbName}`;
const storageBucketName = 'uploads';
let storage = null;             // multer-gridfs-storage : storage to allow multer store file directly to MongoDB
let upload = null;              // multer : parse request's form data to file object
let gfs;                        // gridfs-stream  : stream files to and from MongoDB GridFS. (not being currently used)


storage = new GridFsStorage({
  url: MONGODB_URL,
  file: (req, file) => {
    return {      
      bucketName: `${storageBucketName}`,     //Setting collection name, default name is fs  
      filename: file.originalname             //Setting file name to original name of file        
    }
  },
});
upload = multer({ storage: storage  });

mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    bufferCommands: false,
    bufferMaxEntries: 0
})
.then(()=>{
  //gfs = Grid(mongoose.connection.db, mongoose.mongo);
  //gfs.collection(storageBucketName);
  console.log("connected to URL " + MONGODB_URL);
})
.catch((err) => {
  console.log("Error on db connection: " + err.message);
});

// --------------------------------------------------------------------
// ROUTES
// --------------------------------------------------------------------

// GET profile pictures
router.get('/profilepics', async (req,res) => { 
    res.status(201).send("TODO");
});


// POST profile picture
router.post('/profilepics',upload.single('profilepic'), async (req, res) => {
      console.log(`REQUEST :: create profile picture`);
      console.log(req.file);

      MongoClient.connect(MONGODB_URL, {useUnifiedTopology: true}, function(err, client){
        if(err){      
          console.log("Error: MongoClient Connection error");
          res.status(500).json({ title: 'Uploaded Error', message: 'MongoClient Connection error', error: err.errMsg});    
        } 

        const db = client.db(dbName);
        const collection = db.collection('uploads.files');         // metadata
        const collectionChunks = db.collection('uploads.chunks');  // data
        const fileName = req.file.originalname; 
        // console.log(fileName);
        // console.log(collection);
        // console.log(collectionChunks);

        collection.find({filename: fileName}).toArray(function(err, docs){        
          if(err){        
            console.log("Error: Error finding file");
            res.status(500).json({ title: 'File error', message: 'Error finding file', error: err.errMsg});      
          }
          if(!docs || docs.length === 0){       
            console.log("Error: No file found"); 
            res.status(500).json({ title: 'Download Error', message: 'No file found'});      
          }
          else{
            //console.log(docs);
            //Retrieving the chunks from the db          
            collectionChunks.find({files_id : docs[0]._id})
              .sort({n: 1})
              .toArray(function(err, chunks){          
                if(err){            
                    console.log("Error: Error retrieving chunks"); 
                    res.status(500).json({ title: 'Download Error', message: 'Error retrieving chunks', error: err.errmsg});          
                }
                if(!chunks || chunks.length === 0){            
                  console.log("Error: No data found"); 
                  res.status(500).json({ title: 'Download Error', message: 'No data found'});          
                }
                
                //console.log(chunks);
                let fileData = [];          
                for(let i=0; i<chunks.length;i++){            
                  //This is in Binary JSON or BSON format, which is stored               
                  //in fileData array in base64 endocoded string format                      
                  fileData.push(chunks[i].data.toString('base64'));          
                }
              
              //Display the chunks using the data URI format          
              let finalFile = 'data:' + docs[0].contentType + ';base64,' + fileData.join('');   
              res.status(201).send(finalFile);       
              });      
          } // end else       
        });
      })
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


// --------------------------------------------------------------------
// ROUTE ALL PATHS TO LAMBDA
// --------------------------------------------------------------------

app.use('/.netlify/functions/server/api', router); // path must route to lambda


// --------------------------------------------------------------------
// SERVER LISTENER
// --------------------------------------------------------------------


/* NOT NEEDED WITH NETLIFY
app.listen(3000, () =>
  console.log('Example app listening on port 3000!')
);
*/

// --------------------------------------------------------------------
// SERVELESS SETUP
// --------------------------------------------------------------------

module.exports = app;
module.exports.handler = serverless(app);
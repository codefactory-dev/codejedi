require('dotenv').config()

const serverless = require('serverless-http'),
      bodyParser = require('body-parser'),
      { Console } = require('console'),
      mongoose = require('mongoose'),
      express = require('express'),
      router = express.Router({mergeParams: true}),
      axios = require('axios'),
      cors = require('cors'),
      app = express();

// --------------------------------------------------------------------
// APP CONFIG
// --------------------------------------------------------------------

const local = process.env.LOCAL_SERVER || false;
const proxy = local ? '' : '/.netlify/functions/server/api/';

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
.then(()=> {
    console.log("connected to URL " + MONGODB_URL)
    app._router.stack.forEach(function(r){
        if (r.route && r.route.path){
          console.log(r.route.path)
        }
      })
})
.catch((err) => console.log("Error on db connection: " + err.message));

// --------------------------------------------------------------------
// ROUTES
// --------------------------------------------------------------------

const   UserRouter      = require('./routers/user'),
        RatingRouter     = require('./routers/rating');

// temp
const   ImgRouter      = require('./routers/img'),
        CodeRouter      = require('./routers/code'),
        EditorRouter      = require('./routers/editor');

app.use(proxy, UserRouter);
app.use(proxy, RatingRouter);
app.use(proxy, ImgRouter);
app.use(proxy, CodeRouter);
app.use(proxy, EditorRouter);


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
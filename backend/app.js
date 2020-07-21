require('dotenv').config()

const bodyParser = require('body-parser'),
      express = require('express'),
      router = express.Router(),
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
// ROUTES
// --------------------------------------------------------------------

const   UserRouter    = require('./routers/user'),
        RatingRouter  = require('./routers/rating');

// temp
const   ImgRouter    = require('./routers/img'),
        CodeRouter   = require('./routers/code'),
        EditorRouter = require('./routers/editor');

app.use(proxy, UserRouter);
app.use(proxy, RatingRouter);
app.use(proxy, ImgRouter);
app.use(proxy, CodeRouter);
app.use(proxy, EditorRouter);


// --------------------------------------------------------------------
// SERVELESS SETUP
// --------------------------------------------------------------------

module.exports = app;
// if (!local) module.exports.handler = serverless(app);
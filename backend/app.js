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

const   AuthRouter    = require('./routers/auth'),
        UserRouter    = require('./routers/user'),
        QTrackRouter  = require('./routers/qtrack'),
        RatingRouter  = require('./routers/rating'),
        QuestionRouter  = require('./routers/question'),
        CommentRouter = require('./routers/comment')

// temp
const   ImgRouter    = require('./routers/img'),
        CodeRouter   = require('./routers/code'),
        EditorRouter = require('./routers/editor');

app.use(proxy, AuthRouter);
app.use(proxy, UserRouter);
app.use(proxy, QuestionRouter);
app.use(proxy, CommentRouter);
// app.use(`${proxy}/users/:uid/questions/:qid/ratings`, RatingRouter);
// app.use(`${proxy}/users/:uid/qtracks`, QTrackRouter);
app.use(proxy, ImgRouter);
app.use(proxy, CodeRouter);
app.use(proxy, EditorRouter);


// --------------------------------------------------------------------
// SERVELESS SETUP
// --------------------------------------------------------------------

module.exports = app;
// if (!local) module.exports.handler = serverless(app);
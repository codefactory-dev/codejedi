const bodyParser = require('body-parser'),
      express = require('express'),
      router = express.Router(),
      cors = require('cors'),
      app = express();
      

var path = require('path');      
// --------------------------------------------------------------------
// APP CONFIG
// --------------------------------------------------------------------

const local = process.env.LOCAL_SERVER || false;
const proxy = '';

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
        CommentRouter = require('./routers/comment'),
        SubmissionRouter = require('./routers/submission')

// temp
const   ImgRouter    = require('./routers/img'),
        CodeRouter   = require('./routers/code'),
        EditorRouter = require('./routers/editor');

app.use(proxy, AuthRouter);
app.use(proxy, UserRouter);
app.use(proxy, QuestionRouter);
app.use(proxy, SubmissionRouter);
app.use(proxy, CommentRouter);
app.use(`${proxy}/users/:uid/questions/:qid/ratings`, RatingRouter);
app.use(`${proxy}/users/:uid/qtracks`, QTrackRouter);
app.use(proxy, ImgRouter);
app.use(proxy, CodeRouter);
app.use(proxy, EditorRouter);

if (process.env.NODE_ENV === 'production') 
{
  // Set static folder
  app.use(express.static(path.join(__dirname, '/../frontend/build')));
}
else
{
  app.use(express.static(path.join(__dirname,'/../frontend/src')));
}

module.exports = app;
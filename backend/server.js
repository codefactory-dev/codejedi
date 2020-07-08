require('dotenv').config()

const bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      express = require('express'),
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

const resetDB = require('./resetDB');
resetDB();


const MONGODB_URL = process.env.MONGODB_URL || "mongodb://localhost:27017/codefactory-database";
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
  console.log("gonna create user")
  const user = new User(req.body);
  console.log("created user "+user.name);
  try{
    await user.save()
    res.status(201).send(user)
  } catch(e){
    res.status(500).json({
      error: true,
      message: e.toString()
    });
  }
})


// --------------------------------------------------------------------
// SERVER LISTENER
// --------------------------------------------------------------------

app.listen(3000, () =>
  console.log('Example app listening on port 3000!')
);

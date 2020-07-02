require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const User = require('./models/user')

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

// parse application/json
app.use(bodyParser.json())

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

app.listen(3000, () =>
  console.log('Example app listening on port 3000!')
);

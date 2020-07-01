require('dotenv').config()

const express = require('express');
const app = express();
const User = require('./models/user')

// GET method route
app.get('/user', function (req, res) {
  res.send('Code Factory')
})

app.listen(3000, () =>
  console.log('Example app listening on port 3000!')
);

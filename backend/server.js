require('dotenv').config()

const serverless = require('serverless-http'),
      mongoose = require('mongoose'),
      express = require('express'),
      app = require('./app');

const local = process.env.LOCAL_SERVER || false;

// --------------------------------------------------------------------
// MONGODB/MONGOOSE
// --------------------------------------------------------------------
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
// SERVER LISTENER
// --------------------------------------------------------------------

// NOT NEEDED WITH NETLIFY
if (local) app.listen(3000, () => console.log('Example app listening on port 3000!'));

// --------------------------------------------------------------------
// SERVELESS SETUP
// --------------------------------------------------------------------

if (!local) module.exports.handler = serverless(app);
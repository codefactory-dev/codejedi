const serverless = require('serverless-http'),
      mongoose = require('mongoose'),
      app = require('./app');

const local = process.env.LOCAL_SERVER || false;

// --------------------------------------------------------------------
// MONGODB/MONGOOSE
// --------------------------------------------------------------------
const db = require('./src/utils/db');
db.connect()
    .then(db.initCollections)
    .then(() => db.reset(false))
    .then(() => db.seed(false));

// --------------------------------------------------------------------
// SERVER LISTENER
// --------------------------------------------------------------------

// NOT NEEDED WITH NETLIFY
if (local) app.listen(3000, () => console.log('Example app listening on port 3000!'));

// --------------------------------------------------------------------
// SERVELESS SETUP
// --------------------------------------------------------------------

if (!local) module.exports.handler = serverless(app);
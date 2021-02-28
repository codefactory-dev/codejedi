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
//if (local) app.listen(4000, () => console.log('CodeJedi backend listening on port 4000!'));

// --------------------------------------------------------------------
// SERVELESS SETUP
// --------------------------------------------------------------------

if (!local) module.exports.handler = serverless(app);
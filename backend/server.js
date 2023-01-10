const serverless = require("serverless-http"),
  mongoose = require("mongoose"),
  app = require("./app");

require("dotenv").config();

const local = process.env.LOCAL_SERVER || false;
const port = process.env.PORT || 4000;

// --------------------------------------------------------------------
// MONGODB/MONGOOSE
// --------------------------------------------------------------------
const db = require("./src/utils/db");
db.connect();
/*
    .then(db.initCollections)
    .then(() => db.reset(false))
    .then(() => db.seed(false));
*/

// --------------------------------------------------------------------
// SERVER LISTENER
// --------------------------------------------------------------------

// NOT NEEDED WITH NETLIFY
if (local)
  app.listen(port, () =>
    console.log(`CodeJedi backend listening on port ${port}!`)
  );

// --------------------------------------------------------------------
// SERVELESS SETUP
// --------------------------------------------------------------------

module.exports = app;
//if (!local) module.exports.handler = serverless(app);

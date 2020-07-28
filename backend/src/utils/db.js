const {questions, qtracks, ratings, users, tokens} = require('./seed'),
      QDetail = require('../../models/qdetail'),
      Rating = require('../../models/rating'),
      QBasic = require('../../models/qbasic'),
      Editor = require('../../models/editor'),
      QTrack = require('../../models/qtrack'),
      Token = require('../../models/token'),
      User = require('../../models/user'),
      Img = require('../../models/img'),
      mongoose = require('mongoose');

const db ={};

db.initCollections = () => new Promise(async (resolve, reject) => {
    const models = [User, Rating, QTrack, QBasic, QDetail, Token ];  
    models.forEach(async model => await model.createCollection());

    resolve('Finished creating collections');
});

db.connect = () => new Promise(async (resolve, reject) => {
    const connection = await mongoose.connect(process.env.MONGODB_URL, {
                            useNewUrlParser: true,
                            useCreateIndex: true,
                            useUnifiedTopology: true,
                            bufferCommands: false,
                            bufferMaxEntries: 0
    })
    .then(()=> console.log(`connected to ${process.env.MONGODB_URL}`))
    .catch(err => reject(`Error on db connection:  ${err.message}`));

    const db = mongoose.connection; 

    resolve({connection, db});
});

db.disconnect = () => new Promise(async () => mongoose.disconnect());

db.reset = (logoff = true) => new Promise(async (resolve, reject) => {
            logoff || console.log("Reseting db  *********************");

            await Token.deleteMany({})
                        .then(() => logoff || console.log("reset tokens."))
                        .catch((err) => reject('error: could not reset tokens'));

            await User.deleteMany({})
                        .then(() => logoff || console.log("reset users."))
                        .catch((err) => reject("error: could not reset users"));

            await Rating.deleteMany({})
                        .then(() => logoff || console.log("reset ratings."))
                        .catch((err) => reject("error: could not reset ratings"));

            await QDetail.deleteMany({})
                        .then(() => logoff || console.log("reset qdetails."))
                        .catch((err) => reject("error: could not reset qdetails"));

            await QBasic.deleteMany({})
                        .then(() => logoff || console.log("reset qbasics."))
                        .catch((err) => reject("error: could not rresetemove qbasics"));

            await Editor.deleteMany({})
                        .then(() => logoff || console.log("reset editors."))
                        .catch((err) => reject("error: could not reset editors")); 
            
            await Img.deleteMany({})
                        .then(() => logoff || console.log("reset images."))
                        .catch((err) => reject("error: could not reset images"));
            
            resolve('Finished reseting db');
});

db.seed = async (logoff = true) => new Promise(async (resolve, reject) => {
            logoff || console.log("Seeding db *********************");

            await User.insertMany(users)
                    .then(() => logoff || console.log("created seed users."))
                    .catch(err => reject("Error: could not create seed users."));
                
            await Token.insertMany(tokens)
                    .then(() => logoff || console.log("created seed tokens."))
                    .catch(err => reject("Error: could not create seed tokens. "+err));

            questions.forEach((q, index, arr) => {
                    QBasic.create(q.basic)
                        .catch(err => reject(`Error: could not create seed question basic ${q.basic.title}`))
                        .then(qbasicDB => {
                                QDetail.create(q.detail)
                                    .catch(err => reject(`Error: could not create seed question detail ${q.basic.title}`))
                                    .then(qDetailDB => logoff || console.log(`created seed question ${q.basic.title}`));
                        });
            });

            await Rating.insertMany(ratings)
                    .then(() => logoff || console.log("created seed ratings."))
                    .catch(err => reject("Error: could not create seed ratings."));
            
            resolve('Finished seeding db');
});

module.exports = db;
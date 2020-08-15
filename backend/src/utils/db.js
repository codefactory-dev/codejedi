const {questions, qtracks, users, tokens, qDifficulties, qTypes} = require('./seed'),
      QDifficulty = require('../../models/qdifficulty'),
      Rating = require('../../models/rating'),
      Question = require('../../models/question'),
      Editor = require('../../models/editor'),
      QTrack = require('../../models/qtrack'),
      QType = require('../../models/qtype'),
      User = require('../../models/user'),
      Img = require('../../models/img'),
      mongoose = require('mongoose');

      
const db ={};

db.initCollections = () => new Promise(async (resolve, reject) => {
    const models = [User, Rating, QTrack, QType, Question ];  
    models.forEach(async model => await model.createCollection());

    // init default docs
    await QDifficulty.countDocuments({}, async (err, count) => {
        if (!count) await QDifficulty.create({types: qDifficulties});
    });

    await QType.countDocuments({}, async (err, count) => {
        if (!count) await QType.create({types: qTypes});
    });
    

    resolve('Finished creating collections');
});

db.connect = () => new Promise(async (resolve, reject) => {
    const connection = await mongoose.connect(process.env.MONGODB_URL, {
                            useNewUrlParser: true,
                            useCreateIndex: true,
                            useUnifiedTopology: true,
                            bufferCommands: false,
                            bufferMaxEntries: 0,
                            useFindAndModify: false 
    })
    .then(()=> console.log(`connected to ${process.env.MONGODB_URL}`))
    .catch(err => reject(`Error on db connection:  ${err.message}`));

    const db = mongoose.connection; 

    resolve({connection, db});
});

db.disconnect = () => new Promise(async () => mongoose.disconnect());

db.reset = (logoff = true) => new Promise(async (resolve, reject) => {
            logoff || console.log("Reseting db  *********************");

            await User.deleteMany({})
                        .then(() => logoff || console.log("reset users."))
                        .catch((err) => reject("error: could not reset users"));

            await Rating.deleteMany({})
                        .then(() => logoff || console.log("reset ratings."))
                        .catch((err) => reject("error: could not reset ratings"));
            
            await QTrack.deleteMany({})
                        .then(() => logoff || console.log("reset qtracks."))
                        .catch((err) => reject("error: could not reset qtracks"));

            await Question.deleteMany({})
                        .then(() => logoff || console.log("reset questions."))
                        .catch((err) => reject("error: could not reset questions"));

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

            // await Question.insertMany(questions)
            //             .then(() => logoff || console.log("created seed questions."))
            //             .catch(err => reject("Error: could not create seed questions. "+err));

            // await Rating.insertMany(ratings)
            //         .then(() => logoff || console.log("created seed ratings."))
            //         .catch(err => reject("Error: could not create seed ratings. "+err));
            
            resolve('Finished seeding db');
});

db.runAsTransaction = async (func) => new Promise(async (resolve, reject) => {
        const session = await mongoose.startSession();
        const transactionOptions = {
                readPreference: 'primary',
                readConcern: { level: 'local' },
                writeConcern: { w: 'majority' }
        };

        try {
            await session.withTransaction(async () => {          
                const result = await func();
                resolve(result)
    
            }, transactionOptions);
        }
        catch(e) {
            // console.log(e.message);
            let status = e instanceof mongoose.Error.ValidationError ? 400 : 500;              
            reject({status, message: e.message});
        }
        finally {
            session.endSession();
        }
});

module.exports = db;
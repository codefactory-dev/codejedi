const mongoose = require('mongoose');
const User = require('../../models/user'),
      Rating = require('../../models/rating'),
      QBasic = require('../../models/qbasic'),
      QDetail = require('../../models/qdetail');

const userOne = {
      _id: new mongoose.Types.ObjectId,
      firstname: 'Roberta',
      lastname: 'Mota',
      email: 'roberta.cmota@gmail.com',
      username: 'roberta.crmota',
      password: 'roberta.crmota123',
      joinDate: new Date(),
      qTrackSummary: {
          nbTracksPerType: {
              array: 0,
              string: 0,
              graph: 0
          },
          avgDurationPerType: {
              array: 0,
              string: 0,
              graph: 0
          },
          nbPDifficultyPerType: {
              array: 0,
              string: 0,
              graph: 0
          }
      }
};

const qbasicOne = {
    _id: new mongoose.Types.ObjectId,
    creator: { 
        id: userOne._id,
        username: userOne.username,
        joinDate: userOne.joinDate
    },
    title: 'Number of Islands',
    difficulty: 'Medium',
    type: 'Dynamic Programming',
    hasSolution: false,
};

const qdetailOne = {
    basicsId: qbasicOne._id,
    description: "Given a 2d grid map of '1's (land) and '0's (water), count the number of islands. " +
               + "An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically." +
               + "You may assume all four edges of the grid are all surrounded by water.",    
    creationDate: new Date(),
};

const ratingOne = {
    _id: new mongoose.Types.ObjectId,
    creatorId: userOne._id,
    questionId: qbasicOne._id,
    value: 3,
};



const questions = [{basic: qbasicOne, detail: qdetailOne}];
const ratings = [ratingOne];
const users = [userOne];

const seedDB = async () => {
    console.log("seeding db *********************");

    await User.insertMany(users)
            .then(() => console.log("created seed users."))
            .catch(err => console.error("Error: could not create seed users."));

    questions.forEach((q, index, arr) => {
            QBasic.create(q.basic)
                .catch(err => console.error(`Error: could not create seed question basic ${q.basic.title}`))
                .then(qbasicDB => {
                        QDetail.create(q.detail)
                            .catch(err => console.error(`Error: could not create seed question detail ${q.basic.title}`))
                            .then(qDetailDB => console.log(`created seed question ${q.basic.title}`));
                });
    });

    await Rating.insertMany(ratings)
            .then(() => console.log("created seed ratings."))
            .catch(err => console.error("Error: could not create seed ratings."));
};


module.exports ={
    questions,
    ratings,
    users,
    seedDB
};
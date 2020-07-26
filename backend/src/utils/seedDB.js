const mongoose = require('mongoose');
const User = require('../../models/user'),
      Rating = require('../../models/rating'),
      QTrack = require('../../models/qtrack'),
      QBasic = require('../../models/qbasic'),
      QDetail = require('../../models/qdetail');

const users = [{
      _id: new mongoose.Types.ObjectId,
      firstname: 'Roberta',
      lastname: 'Mota',
      email: 'roberta.cmota@gmail.com',
      username: 'roberta.crmota',
      password: 'roberta.crmota123',
      validated: false,
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
    },
    {
      _id: new mongoose.Types.ObjectId,
      firstname: 'Guilherme',
      lastname: 'Reis',
      email: 'grrbm2@gmail.com',
      username: 'grrbm',
      password: 'grrbm123',
      validated: false,
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
}];

const qOneId = new mongoose.Types.ObjectId;
const qTwoId = new mongoose.Types.ObjectId;
const questions = [
    {
        basic: {
            _id: qOneId,
            creator: { 
                id: users[0]._id,
                username: users[0].username,
                joinDate: users[0].joinDate
            },
            title: 'Number of Islands',
            difficulty: 'Medium',
            type: 'Dynamic Programming',
            hasSolution: false,
        },
        detail: {
            basicsId: qOneId,
            description: "Given a 2d grid map of '1's (land) and '0's (water), count the number of islands. " +
                    + "An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically." +
                    + "You may assume all four edges of the grid are all surrounded by water.",    
            creationDate: new Date(),
        }
    },
    {
        basic: {
            _id: qTwoId,
            creator: { 
                id: users[0]._id,
                username: users[0].username,
                joinDate: users[0].joinDate
            },
            title: 'Number of Islands',
            difficulty: 'Medium',
            type: 'Dynamic Programming',
            hasSolution: false,
        },
        detail: {
            basicsId: qTwoId,
            description: "Given a 2d grid map of '1's (land) and '0's (water), count the number of islands. " +
                    + "An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically." +
                    + "You may assume all four edges of the grid are all surrounded by water.",    
            creationDate: new Date(),
        }
    }
];

const qtracks = [
    {
        questionId: questions[0].basic._id,
        creatorId: users[0]._id,
        perceivedDifficulty: "Medium",
        solved: false,
        duration: 30
    },
    {
        questionId: questions[0].basic._id,
        creatorId: users[1]._id,
        perceivedDifficulty: "Easy",
        solved: true,
        duration: 18
    },
];

const ratings = [{
    _id: new mongoose.Types.ObjectId,
    creatorId: users[0]._id,
    questionId: questions[0].basic._id,
    value: 3,
}];


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
    qtracks,
    ratings,
    users,
    seedDB
};
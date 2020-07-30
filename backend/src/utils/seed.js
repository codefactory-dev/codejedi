const mongoose = require('mongoose'),
      utils = require('./utils');

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
    },
    {
        _id: new mongoose.Types.ObjectId,
        firstname: 'Fulano',
        lastname: 'Detal',
        email: 'fulanodetal@gmail.com',
        username: 'fulanodetal',
        password: 'qu1testrONGP4s$!',
        validated: false,
        admin: true,
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
    }
];

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

const userOneToken = utils.generateToken(users[0]);
const tokens = [{
    _id: new mongoose.Types.ObjectId,
    userId: users[0]._id,
    token: userOneToken
}];


module.exports ={
    questions,
    qtracks,
    ratings,
    users,
    tokens
};
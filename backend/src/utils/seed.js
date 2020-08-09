const mongoose = require('mongoose'),
      utils = require('./utils'),
      casual = require('casual');

const qDifficulties = ["Easy", "Medium", "Hard"];
const qTypes = ["Array", "String", "Linked List", "Stack/Queue", "Tree", "Heap", "HashTable", "Graph", "Sort", "Bit Manipulation", "Greedy", "Dynamic Programming"];


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


const generateUsers = n => {
    const users = [];

    for(let i = 0; i < n; i++) {
        const firstname = casual.first_name,
              lastname = casual.last_name;

        const user = {
            _id: new mongoose.Types.ObjectId,
            firstname: firstname,
            lastname: lastname,
            email: `${lastname}.${firstname}@gmail.com`,
            username: `${firstname}.${lastname}${casual.integer(0, 1000)}`,
            password: casual.password,
            validated: false,
            joinDate: casual.date(),
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

        users.push(user);
    }

    return users;
}

const generateQuestions = (n, users) => {
    const questions = [];

    for(let i = 0; i < n; i++) {
        const id = new mongoose.Types.ObjectId;
        const detailsId = new mongoose.Types.ObjectId;
        const user = casual.random_element(users);

        const question = {
            basic: {
                _id: id,
                detailsId: detailsId,
                creator: { 
                    id: user._id,
                    username: user.username,
                    joinDate: user.joinDate
                },
                title: casual.title,
                difficulty: casual.random_element(qDifficulties),
                type: casual.random_element(qTypes),
                hasSolution: false,
            },
            detail: {
                _id: detailsId,
                basicsId: id,
                description: casual.description,    
                creationDate: casual.date(),
            }
        }

        questions.push(question);
    }
    

    return questions;

}

const generateQTracks = (n, users, questions) => {
    const qtracks = [];

    for(let i = 0; i < n; i++) {
        const id = new mongoose.Types.ObjectId;
        const user = casual.random_element(users);
        const question = casual.random_element(questions);

        const qtrack = {
            _id: id,
            creatorId: user._id,
            questionId: question.basic._id,
            perceivedDifficulty: casual.random_element(qDifficulties),
            solved: casual.boolean,
            duration: casual.integer(10, 100)
        }

        qtracks.push(qtrack);
    }

    return qtracks;
}

const generateComments = (n, users, questions) => {
    const comments = [];

    console.log("BEFORE GENERATING COMMENTS");
    for(let i=0;i<n;i++)
    {
        const id = new mongoose.Types.ObjectId;
        const user = casual.random_element(users);
        const remainingUsers = users.filter((current) => {
            return current._id !== user._id
        });
        const replyingUser = casual.random_element(remainingUsers);
        const question = casual.random_element(questions);
        const creationDate = new Date();
        const comment = {   
            _id: id,         
            questionId: question.basic._id,
            creatorId: user._id,
            description: casual.sentences(6),
            reply: {
                creatorId: replyingUser._id,
                description: casual.sentences(3),
                creationDate: creationDate,
                lastUpdate: creationDate
            }
        }
        comments.push(comment);
    }
    
    console.log("AFTER GENERATING COMMENTS");
    return comments;
}

module.exports ={
    qDifficulties,
    qTypes,
    questions,
    qtracks,
    ratings,
    users,
    tokens,

    generateUsers,
    generateQuestions,
    generateQTracks,
    generateComments
};
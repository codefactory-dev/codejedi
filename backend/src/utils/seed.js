const mongoose = require('mongoose'),
      utils = require('./utils'),
      casual = require('casual');

const qDifficulties = ["Easy", "Medium", "Hard"];
const qTypes = ["Array", "String", "Integer", "Linked List", "Stack/Queue", "Tree", "Heap", "HashTable", "Graph", "Sort", "Bit Manipulation", "Greedy", "Dynamic Programming"];

const basicQtypes = ["Array", "String", "Integer"]

//plain text passwords:
//users[0]: roberta.crmota123
//users[1]: grrbm123

const users = [{
      _id: new mongoose.Types.ObjectId('601fd20089cd1027a4e7a871'),
      firstname: 'Roberta',
      lastname: 'Mota',
      email: 'roberta.cmota@gmail.com',
      username: 'roberta.crmota',
      password: '$2a$08$HMNCu99lFY6AocGuKyqumOPhgQguK4l4dcrUI10wO7Fb0XRXAnJem',
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
      },
      tokens: [{ token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjMzMWY5OTY3ZDgyZDQ0MmMyMmU4MTIiLCJpYXQiOjE1OTcxODU5NDUsImV4cCI6MTU5NzI3MjM0NX0._lQEBaTkDAfomECRFun_u6t_e6JTY46zXv9M_enRd3c"} ]
    },
    {
      _id: new mongoose.Types.ObjectId('601e85cea8d3e41c9cf747a5'),
      firstname: 'Guilherme',
      lastname: 'Reis',
      email: 'grrbm2@gmail.com',
      username: 'grrbm',
      password: '$2a$08$YPhNl9QbAaLw181l1Arx0ue.Lh.pVIkOE1QSU0dCMw96pznfyB7Vy',
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
        _id: new mongoose.Types.ObjectId('601fd20089cd1027a4e7a873'),
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

const userOneToken = utils.generateToken(users[0]);


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
            createdAt: casual.date(),
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

    try {
        for(let i = 0; i < n; i++) {
            const id = new mongoose.Types.ObjectId;
            const user = casual.random_element(users);

            const question = {
                    _id: id,
                    creator: { 
                        id: user._id,
                        username: user.username,
                        createdAt: user.createdAt
                    },
                    title: casual.title,
                    difficulty: casual.random_element(qDifficulties),
                    description: casual.description,
                    solutionName: casual.word,
                    solution: `class Solution {\n   public int Solution (int param) {\n \n\n  }\n}`,
                    languageType: 'Java',
                    parameters: [{name: casual.word, type: 'int'}],
                    testcases: [12,26,2,324],
                    type: casual.random_element(basicQtypes),
                    createdAt: casual.date(),          
            };

            questions.push(question);
        }
        
        return questions;
    } catch(error) {
        console.log("Error generating questions. "+JSON.stringify(error))
    }
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
            questionId: question._id,
            perceivedDifficulty: casual.random_element(qDifficulties),
            solved: casual.boolean,
            duration: casual.integer(10, 100)
        }

        qtracks.push(qtrack);
    }

    return qtracks;
}

const generateRatings = (n, users, questions) => {
    const ratings = [];

    for(let i = 0; i < n; i++) {
        const id = new mongoose.Types.ObjectId;
        const user = casual.random_element(users);
        const question = casual.random_element(questions);

        const rating = {
            _id: id,
            creatorId: user._id,
            questionId: question._id,
            value: casual.integer(1, 5)
        }

        ratings.push(rating);
    }

    return ratings;
};

const generateComments = (n, users, questions) => {
    const comments = [];
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
            questionId: question._id,
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
    return comments;
}

module.exports ={
    qDifficulties,
    qTypes,
    users,

    generateUsers,
    generateQuestions,
    generateQTracks,
    generateRatings,
    generateComments
};
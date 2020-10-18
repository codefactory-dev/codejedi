const express = require('express'),
      router = express.Router({mergeParams: true}),
      middleware = require('../middleware/index'),
      Question = require('../models/question'),
      User = require('../models/user'),
      db = require('../src/utils/db'),
      _ = require('lodash');

// get (basic info) 10 questions sorted by update date
router.get('/questions', middleware.checkLogIn, async (req,res) => { 
    const questions = await Question.find({}, {}, {sort: {lastUpdate: -1}, limit: 10});

    res.status(200).send({questions});
});

// PREFIX: /users/:uid/

//INDEX - GET all user's owned questions
router.get('/users/:uid/questions', middleware.checkLogIn,
                                    middleware.checkQuestionParamsNull,
                                    async (req,res) => {
    const user = await User.findById(req.params.uid).populate('questionIds');

    res.status(201).send({questions: user.questionIds});
});

// CREATE - post a new question
router.post('/users/:uid/questions', middleware.checkLogIn, 
                                     middleware.checkQuestionParamsNull,
                                     async (req,res) => {
   const user = req.user;

   let question = {
       creator: {
           id: user._id,
           username: user.username,
           createdAt: user.createdAt
       },
       title: req.body.title,
       description: req.body.description,
       difficulty: req.body.difficulty,
       type: req.body.type,
       solution: req.body.solution,
       testcases: req.body.testcases,
       testcasesType: req.body.testcasesType,
       languageType: req.body.languageType,
       solutionName: req.body.solutionName
   };

   
   const operation = async () => {
        //create question
        await Question.create(question).then(res => question = res);

        // update user           
        user.questionIds.push(question._id);
        await user.save();

        return question;
    };

    db.runAsTransaction(operation)
        .then(resolve => res.status(201).send({question: resolve}))
        .catch(e => {
            res.status(e.status).json({message: e.message, errors: e.errors})
        });
});

// SHOW - get (all info) specific question
router.get('/users/:uid/questions/:id', middleware.checkLogIn, 
                                        middleware.checkQuestionNull,
                                        middleware.checkQuestionParamsNull,
                                        middleware.checkQuestionOwnership, 
                                        async (req,res) => {

    const question = req.question,
          user = req.user;

    res.status(200).send({question});
});

//UPDATE - update a question
router.put('/users/:uid/questions/:id', middleware.checkLogIn, 
                                          middleware.checkQuestionNull,
                                          middleware.checkQuestionParamsNull,
                                          middleware.checkQuestionOwnership,
                                          async (req,res) => {

    const q    = req.question,
          user = req.user;

    // editable fields: title, difficulty, type, description, solution  
    let question = {
        title: req.body.title,
        difficulty: req.body.difficulty,
        type: req.body.type,
        description: req.body.description,
        solution: req.body.solution
    };

    const operation = async () => {
        // update question
        await Question.updateOne({_id: q._id}, question).then(res => question = res);

        return question;
    };

    db.runAsTransaction(operation)
        .then(resolve => res.status(200).send({question: resolve}))
        .catch(e => res.status(e.status).json(e.message));
});

//DESTROY - delete question
router.delete('/users/:uid/questions/:id', middleware.checkLogIn, 
                                           middleware.checkQuestionNull,
                                           middleware.checkQuestionParamsNull,
                                           middleware.checkQuestionOwnership,
                                           async (req,res) => {
    const user = req.user;

    const operation = async () => {
        // update user           
        user.questionIds = _.remove(user.questionIds, uq => uq.equals(req.params.id));
        await user.save();

        // delete question
        await Question.deleteOne({ _id: req.params.id});

        return 'Question deleted successfully';
    };

    db.runAsTransaction(operation)
        .then(resolve => res.status(200).send(resolve))
        .catch(e => res.status(e.status).json(e.message));
});

module.exports = router;
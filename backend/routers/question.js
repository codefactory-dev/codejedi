const express = require('express'),
      router = express.Router({mergeParams: true}),
      middleware = require('../middleware/index'),
      QDetail = require('../models/qdetail'),
      QBasic = require('../models/qbasic'),
      User = require('../models/user'),
      db = require('../src/utils/db'),
      _ = require('lodash');

// get (basic info) 10 questions sorted by update date
router.get('/questions', middleware.checkLogIn, async (req,res) => { 
    const questions = await QBasic.find({}, {}, {sort: {lastUpdate: -1}, limit: 10});

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
    /*
        # BASIC
            detailsId
            creator (id, username, joinDate)
            title
            difficulty
            type

        # DETAILS
            basicsId (required)
            description
    */
   const user = req.user;

   let qbasic = {
       creator: {
           id: user._id,
           username: user.username,
           joinDate: user.joinDate
       },
       title: req.body.title,
       difficulty: req.body.difficulty,
       type: req.body.type,
       hasSolution: req.body.solution !== undefined
   };
   
   let qdetail = {
           description: req.body.description,
           solution: req.body.solution
   };

   const operation = async () => {
        //create qbasic
        await QBasic.create(qbasic).then(res => qbasic = res);

        // create qdetail
        qdetail.basicsId = qbasic._id;
        await QDetail.create(qdetail).then(res => qdetail = res);

        // update user           
        user.questionIds.push(qbasic._id);
        await user.save();

        return _.assign(qbasic, qdetail);
    };

    db.runAsTransaction(operation)
        .then(resolve => res.status(201).send({question: resolve}))
        .catch(e => res.status(e.status).json(e.message));
});

// SHOW - get (all info) specific question
router.get('/users/:uid/questions/:id', middleware.checkLogIn, 
                                        middleware.checkQuestionNull,
                                        middleware.checkQuestionParamsNull,
                                        middleware.checkQuestionOwnership, 
                                        async (req,res) => {

    const qd   = await QDetail.findOne({basicsId: req.params.id}),
          q    = req.question,
          user = req.user;

    res.status(200).send({question: _.assign(q, qd)});
});

//UPDATE - update a question
router.put('/users/:uid/questions/:id', middleware.checkLogIn, 
                                          middleware.checkQuestionNull,
                                          middleware.checkQuestionParamsNull,
                                          middleware.checkQuestionOwnership,
                                          async (req,res) => {

    const qd   = await QDetail.findOne({basicsId: req.params.id}),
          q    = req.question,
          user = req.user;

    // editable fields: title, difficulty, type, description, solution  
    let qbasic = {
        title: req.body.title,
        difficulty: req.body.difficulty,
        type: req.body.type,
        lastUpdate: new Date(),               // update questions's lastUpdate
        hasSolution: req.body.solution !== undefined
    };
    
    let qdetail = {
        description: req.body.description,
        solution: req.body.solution
    };

    const operation = async () => {
        // update qdetail
        await QDetail.updateOne({_id: qd._id}, qdetail).then(res => qdetail = res);

        // update qbasic
        await QBasic.updateOne({_id: q._id}, qbasic).then(res => qbasic = res);

        return _.assign(qbasic, qdetail);
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

        // delete qdetail
        await QDetail.deleteOne({basicsId: req.params.id}).exec();

        // delete qbasic
        await QBasic.deleteOne({ _id: req.params.id});

        return 'Question deleted successfully';
    };

    db.runAsTransaction(operation)
        .then(resolve => res.status(200).send(resolve))
        .catch(e => res.status(e.status).json(e.message));
});

module.exports = router;
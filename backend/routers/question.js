const express = require('express'),
      router = express.Router({mergeParams: true}),
      middleware = require('../middleware/index'),
      QDetail = require('../models/qdetail'),
      QBasic = require('../models/qbasic'),
      db = require('../src/utils/db');

// get (basic info) 10 questions sorted by update date
router.get('/questions', middleware.checkLogIn, async (req,res) => {
    const questions = await QBasic.find().sort({ lastUpdate: -1 }).limit(10);

    res.status(201).send({questions});
});

// PREFIX: /users/:uid/

//INDEX - GET all user's owned questions
router.get('/users/:uid/questions', middleware.checkLogIn,
                                    middleware.checkQuestionOwnership,
                                    async (req,res) => {
    const user = await User.findById(req.params.uid).populate('questionIds');

    res.status(201).send({questions: user.questionIds});
});

// CREATE - post a new question
router.post('/users/:uid/questions', middleware.checkLogIn, 
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
    const user = await User.findById(req.params.uid);
    let qbasic = {
        creator: {
            id: user._id,
            username: user.username,
            joinDate: user.joinDate
        },
        title: req.body.title,
        difficulty: req.body.difficulty,
        type: req.body.type,
    };
    
    let qdetail = {
            description: req.body.description,
    };

   const operation = async () => {
        //create qbasic
        await QBasic.create(qbasic).then(res => qbasic = res);

        // create qdetail
        qdetail.basicsId = qbasic._id;
        await QDetail.create(qdetail).then(res => qdetail = res);

        // update user           
        user.questions.push(qbasic._id);
        await user.save();

        return _.assign(qbasic, qdetail);
    };

    db.runAsTransaction(operation)
        .then(resolve => res.status(201).send({question: resolve}))
        .catch(reject => res.status(500).json(reject));

});

// SHOW - get (all info) specific question
router.get('/users/:uid/questions/:id', middleware.checkLogIn, 
                                        middleware.checkQuestionOwnership, 
                                        async (req,res) => {
    const qd   = await QDetail.findOne({basicsId: req.params.qid}),
          q    = await QBasic.findById(req.params.qid),
          user = await User.findById(req.params.uid);

    res.status(201).send({question: _.assign(q, qd)});
});

//UPDATE - update a question
router.patch('/users/:uid/questions/:id', middleware.checkLogIn, 
                                          middleware.checkQuestionOwnership,
                                          async (req,res) => {
    const qd   = await QDetail.findOne({basicsId: req.params.qid}),
          q    = await QBasic.findById(req.params.qid),
          user = await User.findById(req.params.uid);

    // editable fields: title, difficulty, type, description, solution  
    let qbasic = {
        title: req.body.title,
        difficulty: req.body.difficulty,
        type: req.body.type,
        lastUpdate: new Date()               // update questions's lastUpdate
    };
    
    let qdetail = {
        description: req.body.description,
        solution: req.body.solution
    };

    const operation = async () => {
        // update qdetail
        await QDetail.findOneAndUpdate({_id: qd._id}, qdetail).then(res => qdetail = res);

        // update qbasic
        await QBasic.findOneAndUpdate({_id: q._id}, qbasic).then(res => qbasic = res);

        return _.assign(qbasic, qdetail);
    };

    db.runAsTransaction(operation)
        .then(resolve => res.status(201).send({question: resolve}))
        .catch(reject => res.status(500).json(reject));
});

//DESTROY - delete question
router.delete('/users/:uid/questions/:id', middleware.checkLogIn, 
                                           middleware.checkQuestionOwnership,
                                           async (req,res) => {
    const user = await User.findById(req.params.uid);

    const operation = async () => {
        // update user           
        user.questions = _.remove(user.questions, uq => uq.equals(req.params.qid));
        await user.save();

        // delete qdetail
        await QDetail.findOne({basicsId: req.params.qid}).remove().exec();

        // delete qbasic
        await QBasic.findByIdAndRemove(req.params.qid);

        return '';
    };

    db.runAsTransaction(operation)
        .then(resolve => res.status(201).send(resolve))
        .catch(reject => res.status(500).json(reject));
});

module.exports = router;
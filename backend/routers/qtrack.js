const express = require('express'),
      router = express.Router({mergeParams: true}),
      middleware = require('../middleware/index'),
      QTrack = require('../models/qtrack'),
      QBasic = require('../models/qbasic'),
      User = require('../models/user'),
      db = require('../src/utils/db'),
      {isNull} = require('./utils'),
      _ = require('lodash');

// PREFIX: /users/:uid/qtracks

// INDEX - get all qtracks      /users/:uid/qtracks
router.get('/', middleware.checkLogIn, 
                middleware.checkQTrackParamsNull,
                async(req, res) => {

    await User.findOne({_id: req.params.uid}).populate("qTrackIds", (err, result) => { 
        if(err) {
            res.status(500).json({ error: true, message: 'Server internal error.' });
        }
        else {
            res.status(200).send({qtracks: result});   
        } 
    });
    
                
});

// CREATE - post new qtrack     /users/:uid/qtracks
router.post('/', middleware.checkLogIn, 
                 middleware.checkQTrackParamsNull,
                 async (req, res) => {

    const user = req.user;
    const question = await QBasic.findById(req.body.questionId);

    if (isNull(user, question)) {
        res.status(400).json({ error: true, message: 'Invalid user.id, q.id parameters.' });
        return;
    }

    let qtrack = {
        creatorId: user._id,
        questionId: question._id,
        perceivedDifficulty: req.body.perceivedDifficulty,
        solved: req.body.solved,
        duration: req.body.duration,
    };

    const operation = async () => {
            //create qtrack
            await QTrack.create(qtrack).then(res => qtrack = res);

            // update user       
            await user.addQtrack(qtrack, question);

            return qtrack;
    };

    db.runAsTransaction(operation)
        .then(resolve => res.status(201).send({qtrack: resolve}))
        .catch(e => res.status(e.status).json(e.message));
  
});

// SHOW - get qtrack info       /users/:uid/qtracks/:id
router.get('/:id', middleware.checkLogIn, 
                   middleware.checkQTrackNull,
                   middleware.checkQTrackParamsNull,
                   middleware.checkQTrackOwnership, 
                   async (req,res) => {

    res.status(200).send({qtrack: req.qtrack});
});


// UPDATE - update qtrack's info    /users/:uid/qtracks/:id
router.put('/:id', middleware.checkLogIn, 
                   middleware.checkQTrackNull,
                   middleware.checkQTrackParamsNull,
                   middleware.checkQTrackOwnership,
                   async (req,res) => {

    const user = req.user;
    const question = await QBasic.findById(req.qtrack.questionId);

    // editable fields: perceivedDifficulty, solved, duration  
    let qtrack = {
        perceivedDifficulty: req.body.perceivedDifficulty,
        solved: req.body.solved,
        duration: req.body.duration,
        lastUpdate: new Date(),               // update qtracks's lastUpdate
    };

    const operation = async () => {
        // update user      
        await user.updateQtrack(req.qtrack, qtrack, question);     

        // update qtrack
        await QTrack.findByIdAndUpdate(req.qtrack._id, qtrack).then(resolve => qtrack = resolve);

        return qtrack;
    };

    db.runAsTransaction(operation)
        .then(resolve => res.status(200).send(resolve))
        .catch(e => res.status(e.status).json(e.message));
    
});

// DELETE - delete qtrack       /users/:uid/qtracks/:id
router.delete('/:id', middleware.checkLogIn, 
                      middleware.checkQTrackNull,
                      middleware.checkQTrackParamsNull,
                      middleware.checkQTrackOwnership,
                      async (req,res) => {

    const qtrack = req.qtrack;
    const user = req.user;
    const question = await QBasic.findById(qtrack.questionId);

    const operation = async () => {
        // update user      
        await user.deleteQtrack(qtrack, question);     

        // delete qtrack
        await QTrack.deleteOne({ _id: qtrack._id});

        return qtrack;
    };

    db.runAsTransaction(operation)
        .then(resolve => res.status(200).send(resolve))
        .catch(e => res.status(e.status).json(e.message));
});

module.exports = router;
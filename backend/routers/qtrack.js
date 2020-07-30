const express = require('express'),
      router = express.Router({mergeParams: true}),
      middleware = require('../middleware/index'),
      QTrack = require('../models/qtrack'),
      QBasic = require('../models/qbasic'),
      User = require('../models/user'),
      db = require('../src/utils/db'),
      {isNull} = require('./utils');

// PREFIX: /users/:uid/qtracks

// INDEX - get all qtracks
router.get('/', async(req, res) => {
    // console.log(`INDEX REQUEST :: qtrack`);

    let user = await User.findById(req.params.uid);
    let qtracks;
    let error;

    error = isNull(user);
    if (error) {
        res.status(400).json({ error: true, message: 'Invalid userId parameters' });
        return;
    }

    User.findById(req.params.uid).populate("qTrackIds").exec((err, tracks) => {
        console.log(tracks);
    });
    
    return res.status(200).send({qtracks});
});

// NEW - get creation form

// CREATE - post new qtrack
router.post('/', middleware.checkIfQTrackParamsAreNull, 
                 middleware.checkQTrackValues,
                 async (req, res) => {

    const user = await User.findById(req.params.uid);
    const q = await QBasic.findById(req.body.questionId);

    let qtrack = {
        creatorId: user._id,
        questionId: q._id,
        perceivedDifficulty: req.body.perceivedDifficulty,
        solved: req.body.solved,
        duration: req.body.duration,
    };

    const operation = async () => {
            //create qtrack
            await QTrack.create(qtrack).then(res => qtrack = res);

            // update user :: TODO
            
            return qtrack;
    };

    db.runAsTransaction(operation)
        .then(resolve => res.status(201).send({qtrack: resolve}))
        .catch(reject => res.status(500).json(reject));

    // console.log(`CREATE REQUEST :: qtracks`);
    // console.log(req.params);

    /*
    let question = await QBasic.findById(req.body.questionId);
    let user = await User.findById(req.params.uid);
    let newQTrack;
    let error;

    error = isNull(user, question);
    if (error) {
        res.status(400).json({ error: true, message: 'Invalid userId, questionId parameters' });
        return;
    } 


    newQTrack = {
        creatorId: req.params.uid,
        questionId: req.body.questionId,
        perceivedDifficulty: req.body.perceivedDifficulty,
        solved: req.body.solved,
        duration: req.body.duration,
    };

    await QTrack.create(newQTrack)
            .then(qtrackDB => {
                user.qTrackIds.push(qtrackDB._id);
                user.save();

                res.status(201).send({qtrack: qtrackDB})
            })
            .catch(e => res.status(500).json({
                            error: true,
                            message: e.toString()
                          }));
    */
});

// SHOW - get qtrack info

// EDIT - get edit form

// UPDATE - update qtrack's info

// DELETE - delete qtrack

module.exports = router;
const express = require('express'),
      router = express.Router({mergeParams: true}),
      Rating = require('../models/rating'),
      QBasic = require('../models/qbasic'),
      User = require('../models/user');

// PREFIX: /users/:uid/questions/:qid


// CREATE new rating
router.post('/', async (req, res) => {
    // console.log(`POST REQUEST :: create new rating`);
    // console.log(req.params);

    let newRating;
    let value = req.body.value;
    let error;

    error = await User.findById(req.params.uid) == null || await QBasic.findById(req.params.qid) == null;
    if (error) {
        res.status(400).json({ error: true, message: 'Invalid userId, questionId parameters' });
        return;
    } 

    error = value == undefined || value <= 0 ||  value > 5;
    if (error) {
        res.status(400).json({ error: true, message: 'Invalid rating value' });
        return;
    } 

    newRating = {
        creatorId: req.params.uid,
        questionId: req.params.qid,
        value: value,
    };

    await Rating.create(newRating)
            .then(resolve => res.status(201).send({rating: resolve}))
            .catch(e => res.status(500).json({
                            error: true,
                            message: e.toString()
                          }));
});

// SHOW - get rating
router.get('/:id', async(req, res) => {
    // console.log(`GET REQUEST :: rating`);

    let rating = await Rating.findById(req.params.id);
    let error;

    error = await User.findById(req.params.uid) == null || await QBasic.findById(req.params.qid) == null;
    error = error || rating.creatorId != req.params.uid || rating.questionId != req.params.qid;
    error = error || rating == null;
    if (error) {
        res.status(400).json({ error: true, message: 'Invalid userId, questionId, ratingId parameters' });
        return;
    }

    return res.status(201).send({rating});
});

// UPDATE - update rating
router.put('/:id/edit', async(req, res) => {
    // console.log(`PUT REQUEST :: rating`);

    let rating = await Rating.findById(req.params.id);
    let value = req.body.value;
    let error;

    error = await User.findById(req.params.uid) === null || await QBasic.findById(req.params.qid) === null;
    error = error || rating.creatorId != req.params.uid || rating.questionId != req.params.qid;
    error = error || rating === null;
    if (error) {
        res.status(400).json({ error: true, message: 'Invalid userId, questionId, ratingId parameters' });
        return;
    }

    error = value === undefined || value <= 0 ||  value > 5;
    if (error) {
        res.status(400).json({ error: true, message: 'Invalid rating value' });
        return;
    }

    await Rating.update({_id: req.params.id, value: value})
                .then(resolve => res.status(201).send({rating: resolve}))
                .catch(e => res.status(500).json({
                            error: true,
                            message: e.toString()
                          }));
});

module.exports = router;
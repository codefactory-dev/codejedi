const express = require('express'),
      router = express.Router({mergeParams: true}),
      Rating = require('../models/rating');


/* 
    TEMPORARY: seedDB to use:
       1. seed user for creating a new rating
       2. seed rating for showing/updating rating's info

    PREFIX: /users/:uid/questions/:qid
*/
const {users, ratings} = require('../src/utils/seedDB');

// CREATE - new rating
router.post('/ratings', async (req, res) => {
    console.log(`POST REQUEST :: create new rating`);
    //console.log(req.body)

    const newRating = {
        creatorId: req.body.creatorId,
        questionId: req.body.questionId,
        value: req.body.value,
    };

    await Rating.create(newRating)
            .then((resolve) => {
                //console.log(`STATUS :: Success`);
                res.status(201).send({rating: resolve});
            })
            .catch((e) => {
                //console.error(`STATUS :: Ops.Something went wrong.`);
                res.status(500).json({
                  error: true,
                  message: e.toString()
                });
            });
});

// SHOW - get rating's info
router.get('/ratings/:id', async(req, res) => {
    console.log(`GET REQUEST :: get rating's data`);
    // console.log(`id: ${req.params.id}`);
    console.log(`seed id: ${ratings[0]._id}`);

    const rating = await Rating.findById(ratings[0]._id);

    if(rating == null) 
        return res.status(500).json({
                    error: true,
                    message: "Could not find rating info"
                });

    return res.status(201).send(rating);
});

// UPDATE - update rating's info   :: TODO

module.exports = router;
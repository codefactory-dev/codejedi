const express = require('express'),
      router = express.Router({mergeParams: true}),
      Rating = require('../models/rating');


/* 
    TEMPORARY: seedDB to use:
       1. seed user for creating a new rating
       2. seed rating for showing/updating rating's info
*/
const {users} = require('../src/utils/seedDB');

// CREATE - new rating
router.post('/ratings', async (req, res) => {
    console.log(`POST REQUEST :: create new rating`);
    console.log(req.body)

    const newRating = {
        creatorId: users[0]._id,
        value: req.body.value,
    };

    await Rating.create(newRating)
            .then((resolve) => {
                console.log(`STATUS :: Success`);
                res.status(201).send(newRating);
            })
            .catch((e) => {
                console.error(`STATUS :: Ops.Something went wrong.`);
                res.status(500).json({
                  error: true,
                  message: e.toString()
                });
            });
});

// SHOW - get rating's info
router.get('/ratings/:id', async(req, res) => {

});

// UPDATE - update rating's info

module.exports = router;
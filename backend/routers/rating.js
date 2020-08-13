const express = require('express'),
      {addAvgRating, updateAvgRating} = require('./utils'),
      router = express.Router({mergeParams: true}),
      middleware = require('../middleware/index'),
      Rating = require('../models/rating'),
      Question = require('../models/question'),
      User = require('../models/user'), 
      db = require('../src/utils/db'), 
      _ = require('lodash');


// PREFIX: /users/:uid/questions/:qid/ratings


// CREATE new rating
router.post('/', middleware.checkLogIn,
                 middleware.checkRatingParamsNull, 
                 async (req, res) => {

    const operation = async () => {
        const user = req.user,
              q    = req.question;

        let rating = {
            creatorId: user._id,
            questionId: q._id,
            value: req.body.value
        };

         //create rating
         await Rating.create(rating)
                    .then(res => rating = res);

         // update user           
         user.ratingIds.push(rating._id);
         await user.save();

        // update question
        q.avgRatings = addAvgRating(q, rating.value);
        q.nbRatings++;
        q.ratingIds.push(rating._id);
        await q.save();

        return rating;
    };

    db.runAsTransaction(operation)
        .then(resolve => res.status(201).send({rating: resolve}))
        .catch(e => res.status(e.status).json(e.message));
});

// SHOW - get rating
router.get('/:id', middleware.checkLogIn,
                   middleware.checkRatingNull,
                   middleware.checkRatingOwnership, 
                   async(req, res) => {

    return res.status(200).send({rating: req.rating});
});

// UPDATE - update rating
router.put('/:id/edit', middleware.checkLogIn,
                        middleware.checkRatingNull,
                        middleware.checkRatingParamsNull, 
                        middleware.checkRatingOwnership, 
                        async(req, res) => {

    const rating = req.rating,
            q    = req.question;   

    const operation = async () => {   
        // update rating
        const prevValue = rating.value;
        rating.value = req.body.value;
        await rating.save();

        // update question
        q.avgRatings = updateAvgRating(q, prevValue, rating.value);
        await q.save();

        return rating;
    };

    db.runAsTransaction(operation)
        .then(resolve => res.status(201).send({rating: resolve}))
        .catch(e => res.status(e.status).json(e.message));
});

module.exports = router;
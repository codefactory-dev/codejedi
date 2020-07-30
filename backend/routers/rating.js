const express = require('express'),
      {addAvgRating, updateAvgRating} = require('./utils'),
      router = express.Router({mergeParams: true}),
      middleware = require('../middleware/index'),
      QDetail = require('../models/qdetail'),
      Rating = require('../models/rating'),
      QBasic = require('../models/qbasic'),
      User = require('../models/user'), 
      db = require('../src/utils/db'), 
      mongoose = require('mongoose'),
      _ = require('lodash');


// PREFIX: /users/:uid/questions/:qid/ratings


// CREATE new rating
router.post('/', middleware.checkIfRatingParamsAreNull, 
                 middleware.checkRatingValue, 
                 async (req, res) => {


    const user = await User.findById(req.params.uid),
          qd   = await QDetail.findOne({basicsId: req.params.qid}),
          q    = await QBasic.findById(req.params.qid);

    let rating = {
        creatorId: user._id,
        questionId: q._id,
        value: req.body.value
    };

    const operation = async () => {
         //create rating
         await Rating.create(rating).then(res => rating = res);

         // update user           
         user.ratingIds.push(rating._id);
         await user.save();

        // update question
        q.avgRatings = addAvgRating(q, rating.value);
        q.nbRatings++;
        await q.save();

        qd.ratingIds.push(rating._id);
        await qd.save();

        return rating;
    };

    db.runAsTransaction(operation)
        .then(resolve => res.status(201).send({rating: resolve}))
        .catch(reject => res.status(500).json(reject));
});

// SHOW - get rating
router.get('/:id', middleware.checkIfRatingParamsAreNull,
                   middleware.checkRatingNullable,  
                   middleware.checkRatingOwnership, 
                   async(req, res) => {

    const rating = await Rating.findById(req.params.id);

    return res.status(201).send({rating});
});

// UPDATE - update rating
router.put('/:id/edit', middleware.checkIfRatingParamsAreNull,
                        middleware.checkRatingNullable, 
                        middleware.checkRatingOwnership, 
                        middleware.checkRatingValue, 
                        async(req, res) => {

    const rating = await Rating.findById(req.params.id),
            q    = await QBasic.findById(req.params.qid);   

    const operation = async () => {
        
        // update rating
        const prevValue = rating.value;
        rating.value = req.body.value;
        rating.save();

        // update question
        q.avgRatings = updateAvgRating(q, prevValue, rating.value);
        await q.save();

        return rating;
    };

    db.runAsTransaction(operation)
        .then(resolve => res.status(201).send({rating: resolve}))
        .catch(reject => res.status(500).json(reject));
});

module.exports = router;
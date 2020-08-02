const express = require('express'),
      {addAvgRating, updateAvgRating} = require('./utils'),
      router = express.Router({mergeParams: true}),
      middleware = require('../middleware/index'),
      QDetail = require('../models/qdetail'),
      Rating = require('../models/rating'),
      QBasic = require('../models/qbasic'),
      User = require('../models/user'), 
      db = require('../src/utils/db'), 
      _ = require('lodash');


// PREFIX: /users/:uid/questions/:qid/ratings


// CREATE new rating
router.post('/', middleware.checkLogIn,
                 middleware.checkRatingParamsNull, 
                 async (req, res) => {

    const operation = async () => {
        const user = await User.findById(req.params.uid),
              qd   = await QDetail.findOne({basicsId: req.params.qid}),
              q    = await QBasic.findById(req.params.qid);

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
        await q.save();

        qd.ratingIds.push(rating._id);
        await qd.save();

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

    const rating = await Rating.findById(req.params.id)
                                .catch(e => { res.status(500).json({error: true, message: e}) });;

    return res.status(200).send({rating});
});

// UPDATE - update rating
router.put('/:id/edit', middleware.checkLogIn,
                        middleware.checkRatingNull,
                        middleware.checkRatingParamsNull, 
                        middleware.checkRatingOwnership, 
                        async(req, res) => {

    const rating = await Rating.findById(req.params.id),
            q    = await QBasic.findById(req.params.qid);   

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
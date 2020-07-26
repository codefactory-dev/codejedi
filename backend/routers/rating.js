const express = require('express'),
      router = express.Router({mergeParams: true}),
      middleware = require('../middleware/index'),
      QDetail = require('../models/qdetail'),
      Rating = require('../models/rating'),
      QBasic = require('../models/qbasic'),
      {calcAvgRating} = require('./utils'),
      User = require('../models/user'),  
      _ = require('lodash');


// PREFIX: /users/:uid/questions/:qid/ratings


// CREATE new rating
router.post('/', middleware.checkRatingParamsNullable, 
                 middleware.checkRatingValue, 
                 async (req, res) => {

    const qd   = await QDetail.findOne({basicsId: req.params.qid}),
          user = await User.findById(req.params.uid),
          q    = await QBasic.findById(req.params.qid);

    const prevAvgRatings = q.avgRatings,
          prevNbRatings  = q.nbRatings;

    let updatedQuestion = false,
        updatedUser     = false,
        newRatingId     = undefined;

    const newRating = {
        creatorId: req.params.uid,
        questionId: req.params.qid,
        value: req.body.value
    };

    await Rating.create(newRating)
            .then(async ratingDB => {
                newRatingId = ratingDB._id;

                // update user           
                user.ratingIds.push(ratingDB._id);
                await user.save();
                updatedUser = true;

                // update question
                q.avgRatings = calcAvgRating(q, ratingDB.value);
                q.nbRatings++;
                await q.save();
                updatedQuestion = true;

                qd.ratingIds.push(ratingDB._id);
                await qd.save(); 
                
                res.status(201).send({rating: ratingDB});
            })
            .catch(async e => {
                // backtrack user  
                if (newRatingId && updatedUser) {
                    user.ratingIds = _.remove(user.ratingIds, id => id.equals(newRatingId));
                    await user.save();
                }

                // backtrack question
                if (newRatingId && updatedQuestion) {
                    q.avgRatings = prevAvgRatings;
                    q.nbRatings = prevNbRatings;
                    await q.save();

                    qd.ratingIds = _.remove(qd.ratingIds, id => id.equals(newRatingId));
                    await qd.save(); 
                }

                res.status(500).json({ error: true, message: e.toString() })
            });
});

// SHOW - get rating
router.get('/:id', middleware.checkRatingParamsNullable,
                   middleware.checkRatingNullable,  
                   middleware.checkRatingOwnership, 
                   async(req, res) => {

    const rating = await Rating.findById(req.params.id);

    return res.status(201).send({rating});
});

// UPDATE - update rating
router.put('/:id/edit', middleware.checkRatingParamsNullable,
                        middleware.checkRatingNullable, 
                        middleware.checkRatingOwnership, 
                        middleware.checkRatingValue, 
                        async(req, res) => {

    const qbasic = await QBasic.findById(req.params.qid);
 
    await Rating.update({_id: req.params.id, value: req.body.value})
                .then(ratingDB => {
                    
                    // update question   

                    res.status(201).send({rating: ratingDB})
                })
                .catch(e => res.status(500).json({
                            error: true,
                            message: e.toString()
                }));
});

module.exports = router;
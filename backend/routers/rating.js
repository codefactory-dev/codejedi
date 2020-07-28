const express = require('express'),
      router = express.Router({mergeParams: true}),
      middleware = require('../middleware/index'),
      QDetail = require('../models/qdetail'),
      Rating = require('../models/rating'),
      QBasic = require('../models/qbasic'),
      {calcAvgRating} = require('./utils'),
      User = require('../models/user'),  
      mongoose = require('mongoose'),
      _ = require('lodash');


// PREFIX: /users/:uid/questions/:qid/ratings


// CREATE new rating
router.post('/', middleware.checkRatingParamsNullable, 
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

    const session = await mongoose.startSession();
    const transactionOptions = {
        readPreference: 'primary',
        readConcern: { level: 'local' },
        writeConcern: { w: 'majority' }
    };

    try {
        await session.withTransaction(async () => {
            
            await Rating.create(rating).then(res => rating = res);

            // update user           
            user.ratingIds.push(rating._id);
            await user.save();

             // update question
             q.avgRatings = calcAvgRating(q, rating.value);
             q.nbRatings++;
             await q.save();

             qd.ratingIds.push(rating._id);
             await qd.save();

             res.status(201).send({rating: rating});

        }, transactionOptions);
    }
    catch(e) {
        console.log(e)
        res.status(500).json({ error: true, message: e.toString()})
    }
    finally {
        session.endSession();
      }
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
const express = require('express'),
      router = express.Router({mergeParams: true}),
      middleware = require('../middleware/index'),
      QDetail = require('../models/qdetail'),
      Rating = require('../models/rating'),
      QBasic = require('../models/qbasic'),
      User = require('../models/user'),    
      {isNull} = require('./utils');


// PREFIX: /users/:uid/questions/:qid/ratings


// CREATE new rating
router.post('/', middleware.checkRatingParamsNullable, 
                 middleware.checkRatingValue, 
                 async (req, res) => {

    const user = await User.findById(req.params.uid);
    const qbasic = await QBasic.findById(req.params.qid);
    const qdetail = await QDetail.findOne({basicsId: req.params.qid});

    const newRating = {
        creatorId: req.params.uid,
        questionId: req.params.qid,
        value: req.body.value
    };

    await Rating.create(newRating)
            .then(ratingDB => {

                // update user
                user.ratingIds.push(ratingDB._id);
                user.save();

                // update question     
                qbasic.avgRatings = ((qbasic.avgRatings*qbasic.nbRatings) + ratingDB.value) / (qbasic.nbRatings+1);
                qbasic.nbRatings += 1;
                qbasic.save();
                qdetail.ratingIds.push(ratingDB._id);
                qdetail.save(); 

                res.status(201).send({rating: ratingDB});
            })
            .catch(e => res.status(500).json({
                            error: true,
                            message: e.toString()
            }));
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
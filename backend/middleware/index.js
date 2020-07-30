const express = require('express'),
      Rating = require('../models/rating'),
      QBasic = require('../models/qbasic'),
      QDetail = require('../models/qdetail'),
      User = require('../models/user'),
      {isNull} = require('../routers/utils');

// all the middleare goes here
let middleware = {};


middleware.checkRatingNullable = async (req, res, next) => {
    const rating = await Rating.findById(req.params.id);

    if (isNull(rating)) 
        res.status(400).json({ error: true, message: 'Invalid rating.id parameter.' });
    else
        next();
};

middleware.checkIfRatingParamsAreNull = async (req, res, next) => {
    const user = await User.findById(req.params.uid);
    const qbasic = await QBasic.findById(req.params.qid);
    const qdetail = await QDetail.findOne({basicsId: req.params.qid});

    if (isNull(user, qbasic, qdetail))
        res.status(400).json({ error: true, message: 'Invalid user.id and/or question.id parameters.' });
    else
        next();
};

middleware.checkRatingOwnership = async (req, res, next) => {
    const rating = await Rating.findById(req.params.id);
    const error = !rating.creatorId.equals(req.params.uid) || !rating.questionId.equals(req.params.qid);

    if (error)
        res.status(400).json({ error: true, message: 'Invalid user.id and/or question.id for the given rating.' });
    else
        next();
};

middleware.checkRatingValue = (req, res, next) => {
    const value = req.body.value;
    const error = !value || value <= 0 ||  value > 5;

    if (error)
        res.status(400).json({ error: true, message: 'Invalid rating value.' });
    else
        next();
};

module.exports = middleware;
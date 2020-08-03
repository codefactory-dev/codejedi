const express = require('express'),
      QDifficulty = require('../models/qdifficulty'), 
      QDetail = require('../models/qdetail'),     
      {isNull} = require('../routers/utils'),
      Rating = require('../models/rating'),
      QBasic = require('../models/qbasic'),
      User = require('../models/user'),
      jwt = require('jsonwebtoken'),
      _ = require('lodash');

// all the middleare goes here
let middleware = {};

// -----------------------------------------------------------------------------
// Auth
// -----------------------------------------------------------------------------

// TO-DO
middleware.checkLogIn = async(req, res, next) => {
    next();
}

// -----------------------------------------------------------------------------
// QTrack
// -----------------------------------------------------------------------------

middleware.checkQTrackParamsNull = async (req, res, next) => {
    const user = await User.findById(req.params.uid);

    if (isNull(user))
        res.status(400).json({ error: true, message: 'Invalid user.id parameter.' });
    else
        next();
};

// -----------------------------------------------------------------------------
// Question
// -----------------------------------------------------------------------------
middleware.checkQuestionOwnership = async (req, res, next) => {
    const question = await QBasic.findById(req.params.id);
    const error = !question.creator.id.equals(req.params.uid);

    if (error)
        res.status(400).json({ error: true, message: 'Invalid user.id for the given question.' });
    else
        next();
}

middleware.checkQuestionNull = async (req, res, next) => {
    const question = await QBasic.findById(req.params.id);

    if (isNull(question)) 
        res.status(400).json({ error: true, message: 'Invalid question.id parameter.' });
    else
        next();
}

middleware.checkQuestionParamsNull = async (req, res, next) => {
    const user = await User.findById(req.params.uid);

    if (isNull(user))
        res.status(400).json({ error: true, message: 'Invalid user.id parameter.' });
    else
        next();
}

// -----------------------------------------------------------------------------
// Rating
// -----------------------------------------------------------------------------
middleware.checkRatingNull = async (req, res, next) => {
    const rating = await Rating.findById(req.params.id);

    if (isNull(rating)) 
        res.status(400).json({ error: true, message: 'Invalid rating.id parameter.' });
    else
        next();
};

middleware.checkRatingParamsNull = async (req, res, next) => {
    const user = await User.findById(req.params.uid);
    const question = await QBasic.findById(req.params.qid);

    if (isNull(user, question))
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


middleware.auth = async (req,res, next) => {
    try{
        const token = req.header('Authorization').replace('Bearer ','');
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token})

        if (!user) {
            throw new Error()
        }

        req.token = token;
        req.user = user;
        next()
    } catch (e){

    }

};

module.exports = middleware;
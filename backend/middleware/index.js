const express = require('express'),
      QDifficulty = require('../models/qdifficulty'),   
      {isNull} = require('../routers/utils'),
      Rating = require('../models/rating'),
      QTrack = require('../models/qtrack'),
      Question = require('../models/question'),
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

// -----------------------------------------------------------------------------
// QTrack
// -----------------------------------------------------------------------------
middleware.checkQTrackNull = async (req, res, next) => {
    req.qtrack = req.qtrack || await QTrack.findById(req.params.id);

    if (isNull(req.qtrack)) 
        res.status(400).json({ error: true, message: 'Invalid qtrack.id parameter.' });
    else 
        next();
}

middleware.checkQTrackParamsNull = async (req, res, next) => {
    req.user = req.user || await User.findById(req.params.uid);

    if (isNull(req.user))
        res.status(400).json({ error: true, message: 'Invalid user.id parameter.' });
    else
        next();
};

middleware.checkQTrackOwnership = async (req, res, next) => {
    req.qtrack = req.qtrack || await QTrack.findById(req.params.id);
    const error = !req.qtrack.creatorId.equals(req.params.uid);

    if (error)
        res.status(400).json({ error: true, message: 'Invalid user.id for the given qtrack.' });
    else
        next();
}

// -----------------------------------------------------------------------------
// Question
// -----------------------------------------------------------------------------
middleware.checkQuestionNull = async (req, res, next) => {
    const question = await Question.findById(req.params.id);

    if (isNull(question)) 
        res.status(400).json({ error: true, message: 'Invalid question.id parameter.' });
    else {
        req.question = question;
        next();
    }
}

middleware.checkQuestionParamsNull = async (req, res, next) => {
    const user = await User.findById(req.params.uid);
    if (isNull(user)){
        res.status(400).json({ error: true, message: 'Invalid user.id parameter in question: '+req.params.uid });
    }
    else{
        req.user = user;
        next();
    }
}

middleware.checkQuestionOwnership = async (req, res, next) => {
    const question = req.question || await Question.findById(req.params.id);
    const error = !question.creator.id.equals(req.params.uid);

    if (error)
        res.status(400).json({ error: true, message: 'Invalid user.id for the given question.' });
    else {
        req.question = question;
        next();
    }
}


// -----------------------------------------------------------------------------
// Rating
// -----------------------------------------------------------------------------
middleware.checkRatingNull = async (req, res, next) => {
    const rating = await Rating.findById(req.params.id);

    if (isNull(rating)) 
        res.status(400).json({ error: true, message: 'Invalid rating.id parameter.' });
    else{
        req.rating = rating;
        next();
    }
};

middleware.checkRatingParamsNull = async (req, res, next) => {
    const user = await User.findById(req.params.uid);
    const question = await Question.findById(req.params.qid);

    if (isNull(user, question))
        res.status(400).json({ error: true, message: 'Invalid user.id and/or question.id parameters.' });
    else{
        req.user = user;
        req.question = question;
        next();
    }
};

middleware.checkRatingOwnership = async (req, res, next) => {
    const rating = req.rating || await Rating.findById(req.params.id);
    const error = !rating.creatorId.equals(req.params.uid) || !rating.questionId.equals(req.params.qid);

    if (error)
        res.status(400).json({ error: true, message: 'Invalid user.id and/or question.id for the given rating.' });
    else {
        req.rating = rating;
        next();
    }
};

module.exports = middleware;
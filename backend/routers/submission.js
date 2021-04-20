const User = require('../models/user');

const express = require('express'),
      router = express.Router({mergeParams: true}),
      middleware = require('../middleware/index'),
      Submission = require('../models/submission'),
      Question = require('../models/question'),
      db = require('../src/utils/db')

//INDEX - GET all submissions
router.get('/submissions', middleware.checkLogIn,
                                    middleware.checkQuestionParamsNull,
                                    async (req,res) => {
    console.log("getting all submissions")
    const submissions = await Submission.find({});

    res.status(200).send(submissions);
});

// SHOW - get (all info) specific submission
router.get('/submissions/:id', middleware.auth,async (req,res) => {

    const submission = await Submission.findById(q._id)

    res.status(200).send(submission);
});

// CREATE - post a new submission
router.post('/submissions', async (req,res) => {
    console.log(`REQUEST :: create submission  ${req.body.creatorId}`);
  
    const newSubmission = {
      creatorId: req.body.creatorId,
      questionId: req.body.questionId,
      dateTime: req.body.dateTime,
      submissionCode: req.body.submissionCode,
      stdout: req.body.stdout,
      stderr: req.body.stderr,
      error: req.body.error
    };
    
    try{
      const operation = async () => { 
        //create submission
        const submission = await Submission.create(newSubmission);
        //put submission id into the user
        const query = { _id: req.body.creatorId };
        await User.updateOne(query, { $push: { submissions: submission._id } });
        //put submission id into the question
        await Question.updateOne(query, { $push: { submissions: submission._id } });
      }
      await db.runAsTransaction(operation)
      
      //if all passed, send back 201
      console.log(`STATUS :: Success`);
      res.status(201).send(newSubmission)
      
      
    } catch(e){
      console.error(`STATUS :: Ops.Something went wrong. `+e.message);
      res.status(500).json({
        error: true,
        message: e.message
      });
    }
});

module.exports = router;
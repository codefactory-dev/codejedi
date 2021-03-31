const express = require('express'),
      router = express.Router({mergeParams: true}),
      middleware = require('../middleware/index'),
      Submission = require('../models/submission')

//INDEX - GET all user's owned questions
router.get('/users/:uid/submissions', middleware.checkLogIn,
                                    middleware.checkQuestionParamsNull,
                                    async (req,res) => {
    console.log("getting user submissions")
    //const user = await User.findById(req.params.uid).populate('questionIds');
    const submissions = await Submission.find({ 'creator.id': req.params.uid})

    //res.status(201).send({questions: user.questionIds});
    res.status(201).send(submissions);
});

// CREATE - post a new comment
router.post('/users/:uid/submissions', async (req,res) => {
    console.log(`REQUEST :: create submission  ${req.body._id}`);
  
    const newSubmission = {
      questionId: req.body.questionId,
    };
    
    try{
      const submission = await Submission.create(newSubmission);
      console.log(`STATUS :: Success`);
      res.status(201).send(newSubmission);
    } catch(e){
      console.error(`STATUS :: Ops.Something went wrong. `+e.toString());
      res.status(500).json({
        error: true,
        message: e.toString()
      });
    }
});

module.exports = router;
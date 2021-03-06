const qbasic = require('../models/question');

const express = require('express'),
      router = express.Router({mergeParams: true}),
      Comment = require('../models/comment'),
      User = require('../models/user'),
      Question = require('../models/question'),
      middleware = require('../middleware/index'),
      db = require('../src/utils/db')



//INDEX - GET all comments
router.get('/comments', async (req,res) => {
    console.log("REQUEST ::  get all comments");
    try{
      const comments = await Comment.find({})
      return res.send(comments)
    } catch(error) {
      return res.status(500).json({
        error: true,
        message: e.toString()
      });
    }
});

// SHOW - get specific comment
router.get('/comments/:id', async (req,res) => {
  try{
      const comment = await Comment.findById(req.params.id)
      if (!comment)
      {
        return res.status(404).send()
      }
      console.log("RETURNING A COMMENT: "+comment)
      res.send(comment);
  } catch(error) {
      return res.status(500).send(error)
  }
})
  
// CREATE - post a new comment
router.post('/comments', async (req,res) => {
    console.log(`REQUEST :: create comment  ${req.body._id}`);
  
    const newComment = {
      questionId: req.body.questionId,
      creatorId: req.body.creatorId,
      description: req.body.description,
      creationDate: req.body.creationDate,
      lastUpdate: req.body.lastUpdate,
    };
    
    try{
      const comment = await Comment.create(newComment);
      console.log(`STATUS :: Success`);
      res.status(201).send(newComment);
    } catch(e){
      console.error(`STATUS :: Ops.Something went wrong. `+e.toString());
      res.status(500).json({
        error: true,
        message: e.toString()
      });
    }
});

//UPDATE - updates a comment
router.patch('/comments/:id', async (req,res) => {
  console.log("REQUEST ::  update comment "+req.params.id);
  const updates = Object.keys(req.body)
  console.log("keys = "+updates.toString());
  const allowedUpdates = ["description","reply"];
  const updatesAreValid = updates.every((update)=>allowedUpdates.includes(update))
  if (!updatesAreValid)
  {
    return res.status(400).send({error: 'Updates not valid !'})
  }
  try{
    const comment = await Comment.findByIdAndUpdate(req.params.id,req.body, {runValidators: true, new:true})
    
    if (!comment)
    {
      console.error("Comment not found");
      return res.status(404).send({error: "Comment not found"})
    }
    console.log("UPDATED COMMENT "+comment._id);
    res.status(200).send(comment);
  } catch(e){
    console.error("Error 500: "+e.toString());
    res.status(500).send({error: e})
  }
})

//DESTROY - delete user's info
router.delete('/comments/:id', async (req,res) => {
  console.log(`REQUEST :: DELETE comment ${req.params.id}`);

  //1-Need to delete comment from table COMMENT
  //2-Need to delete commentIds from table USER
  //3-Need to delete commentIds from some question's questionDetails

  const commentId = req.params.id;
  try{
    
    const operation = async () => {

      //1
      const comment = await Comment.findByIdAndDelete(commentId);


      //2
      const creatorId = comment.creatorId;
      const ownerUser = await User.findById(creatorId);
      ownerUser.commentIds.pull(commentId);
      await ownerUser.save();

      //3
      const questionBasicId = comment.questionId;
      const qBasic = await QBasic.findById(questionBasicId);
      const qDetail = await QDetail.findById(qBasic.detailsId);
      qDetail.commentIds.pull(commentId);
      await qDetail.save();
      
      //console.log("COMMENT: "+commentId+" creatorId: "+creatorId+" qBId: "+questionBasicId);
      
    };

    db.runAsTransaction(operation)
        .then(resolve => res.status(200).send())
        .catch(e => res.status(e.status).json(e.message));

  }catch(e){
    console.error("Error 500: "+e.toString())
    res.status(500).send({error: e.toString()})
  }
})

// EDIT /photos/:id/edit GET
router.get('/users/:id/edit', async (req,res) => {

});


//NEW /photos/new	GET
router.get('/users/:id/new', async (req,res) => {

});

module.exports = router;
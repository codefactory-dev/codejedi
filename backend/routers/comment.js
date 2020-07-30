const express = require('express'),
      router = express.Router({mergeParams: true}),
      Comment = require('../models/comment');



//INDEX - GET all comments
router.get('/comments', async (req,res) => {
    console.log("REQUEST ::  get all comments");
    try{
      const comments = await Comment.find({})
      console.log(JSON.stringify(comments));
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
    console.log(`REQUEST :: create comment  ${req.body.username}`);
  
    const [firstname, lastname] = req.body.name.split(' ');
    const newUser = {
      firstname,
      lastname,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      validated: req.body.validated,
      qTrackSummary: {
        nbTracksPerType: {
          'Array': 0,
          'String': 0,
          'Tree': 0
        },
        avgDurationPerType: {
          'Array': 0,
          'String': 0,
          'Tree': 0
        },
        nbPDifficultyPerType: {
          'Array': 0,
          'String': 0,
          'Tree': 0
        }
      }
    };
  
    const alreadyExistent = await User.find({ $or: [ { 'email': newUser.email }, { 'username': newUser.username } ]});
    
    console.log("alreadyExistent: "+alreadyExistent.username);
    if (alreadyExistent.length > 0)
    {
      console.error(`STATUS :: Conflict`);
      return res.status(409).send();
    }
    
    await User.create(newUser)
            .then((resolve) => {
              console.log(`STATUS :: Success`);
              console.log(resolve);
              res.status(201).send(newUser);
            })
          .catch((e) => {
            console.error(`STATUS :: Ops.Something went wrong. `+e.toString());
            res.status(500).json({
              error: true,
              message: e.toString()
            });
          });
});

//UPDATE - updates a user
router.patch('/users/:id', async (req,res) => {
  console.log("REQUEST ::  update user "+req.body.username);
  const updates = Object.keys(req.body)
  console.log("keys = "+updates.toString());
  const allowedUpdates = ["firstname","lastname","email", "username", "password","joinDate",
                          "profileImage","profileVisibility","qTrackSummary"];
  const updatesAreValid = updates.every((update)=>allowedUpdates.includes(update))
  if (!updatesAreValid)
  {
    return res.status(400).send({error: 'Updates not valid !'})
  }
  try{
    const user = await User.findByIdAndUpdate(req.params.id,req.body, {runValidators: true, new:true})
    
    if (!user)
    {
      res.status(404).send({error: "User not found"})
    }
    res.send(user)
  } catch(e){
    res.status(500).send({error: e})
  }
})

//DESTROY - delete user's info
router.delete('/users/:id', async (req,res) => {
  const _id = req.params.id;
  try{
    const user = await User.findByIdAndDelete(_id)
    if (!user)
    {
      return res.status(404).send({error: 'User not found'})
    }
    res.status(200).send(user)
    console.log("user deleted successfully");

  }catch(e){
    res.status(500).send({error: e})
  }
})

// EDIT /photos/:id/edit GET
router.get('/users/:id/edit', async (req,res) => {

});


//NEW /photos/new	GET
router.get('/users/:id/new', async (req,res) => {

});

module.exports = router;
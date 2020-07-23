const express = require('express'),
      router = express.Router({mergeParams: true}),
      User = require('../models/user');

// get all users
router.get('/users', async (req,res) => {
    console.log("will try to get users");
    try{
      const users = await User.find({})
      return res.send(users)
    } catch(error) {
      return res.status(500).json({
        error: true,
        message: e.toString()
      });
    }
});

// get specific user
router.get('/users/:id', async (req,res) => {
  try{
      const user = await User.findById(req.params.id)
      if (!user)
      {
        return res.status(404).send()
      }
      console.log("RETURNING A USER: "+user)
      res.send(user);
  } catch(error) {
      return res.status(500).send(error)
  }
})
  
// create a user
router.post('/users', async (req,res) => {
    console.log(`REQUEST :: create user  ${req.body.name}`);
  
    const [firstname, lastname] = req.body.name.split(' ');
    const newUser = {
      firstname,
      lastname,
      email: `${firstname}@gmail.com`,
      username: firstname,
      password: `${lastname}123`,
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
  
  
    await User.create(newUser)
            .then((resolve) => {
              console.log(`STATUS :: Success`);
              console.log(resolve);
              res.status(201).send(newUser);
            })
          .catch((e) => {
            console.error(`STATUS :: Ops.Something went wrong.`);
            res.status(500).json({
              error: true,
              message: e.toString()
            });
          });
});

//update a user
router.patch('/users/:id', async (req,res) => {
  const updates = Object.keys(req.body)
  console.log("keys = "+updates.toString());
  const allowedUpdates = ["name","email","password", "confirmed", "alarms"]
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

//delete a user
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

module.exports = router;
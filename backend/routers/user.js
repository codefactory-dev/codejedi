const express = require('express'),
      router = express.Router({mergeParams: true}),
      User = require('../models/user');

// GET method route
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
  
// POST method route
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

module.exports = router;
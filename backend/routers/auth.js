const express = require('express'),
      router = express.Router({mergeParams: true}),
      User = require('../models/user'),
      Token = require('../models/token'),
      utils = require('../src/utils/utils'),
      middleware = require('../middleware/index')

// validate the user credentials
router.post('/auth/signin', async function (req, res) {
  try{
    const user = await User.findByCredentials(req.body.email, req.body.password);
    res.status(200).send(user);
  } catch(e){
    res.status(400).send(e.toString());
  }   
});

router.post('/auth/signout', middleware.auth, async function (req, res) {
  try {
    req.user.tokens = req.user.tokens.filter((token)=>{
      return token.token !== req.token
    })
    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.post('/auth/signoutall', middleware.auth, async function (req, res) {
  try {
    req.user.tokens = [];
    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

//user confirmation by token
router.post('/auth/validate', async (req,res) => {
    console.log(`REQUEST :: validate user ${req.body.email} with token ${req.body.token}`);
    try{
      // Find a matching token
      Token.findOne({ token: req.body.token }, function (err, token) {
        if (err)
        {
          return res.status(501).json({ error: true, message: 'there was an error. '+err });
        }
        if (!token) return res.status(400).json({ error: true, message: 'We were unable to find a valid token. Your token may have expired.' });
        // If we found a token, find a matching user
        User.findOne({ _id: token.userId, email: req.body.email }, function (err, user) {
            if (!user) return res.status(400).json({ error: true, message: 'We were unable to find a user for this token.' });
            if (user.validated) return res.status(400).json({ error: true, message: 'This user has already been verified.' });

            // Verify and save the user
            user.validated = true;
            user.save(function (err) {
                if (err) { return res.status(500).json({ error:true, message: err.message.toString() }); }
                res.status(200).send("The account has been verified. Please log in.");
            });
        });
      });
    } catch(e){
      console.error("There was an interal server error: "+e.toString())
      res.status(500).json({error:true, message: e.toString()})
    }
})

module.exports = router;
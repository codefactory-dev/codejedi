const express = require('express'),
      router = express.Router({mergeParams: true}),
      User = require('../models/user'),
      Token = require('../models/token'),
      utils = require('../src/utils/utils'),
      middleware = require('../middleware/index'),
      sendConfirmationEmail = require('../templates/signupConfirmationEmail.js')

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
    console.log(`REQUEST :: validate user ${req.body.email}`);    
    
    //generate token and send it with validated=true encoded
    //save token to the user
    try{
      const user = await User.findByCredentials(req.body.email,req.body.password);
      const validationToken = await user.generateValidationToken();
      console.log("this is the validation token: "+validationToken)
      const result = await sendConfirmationEmail(token, user.email);
      console.log("email sent. result: "+JSON.stringify(result));
      res.status(200).send("Email sent.");
    }catch(e){
      res.status(500).send("Error: "+e.toString());
    }
    
})

module.exports = router;
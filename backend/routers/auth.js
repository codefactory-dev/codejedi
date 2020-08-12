const express = require('express'),
      router = express.Router({mergeParams: true}),
      User = require('../models/user'),
      Token = require('../models/token'),
      utils = require('../src/utils/utils'),
      jwt = require('jsonwebtoken'),
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
router.post('/auth/validate/:token', async (req,res) => {
  try {
    const tk = req.params.token;
    const decoded = await jwt.verify(tk,process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);
    const token = user.tokens.find((e) => { e.token === req.params.token });
    if (!token)
    {
      return res.status(404).send("Your token has expired.");
    }
    if (token.validated)
    {
      user.set({ validated: true });
      await user.save();
      return res.status(200).send(user);
    }
  } catch(e){
    return res.status(500).send("Error: "+e.toString())
  }


});

//request validation by token
router.post('/auth/requestValidation', async (req,res) => {
    console.log(`REQUEST :: validate user ${req.body.email}`);    
    
    //generate token and send it with validated=true encoded
    //save token to the user
    try{
      const user = await User.findByCredentials(req.body.email,req.body.password);
      const validationToken = await user.generateValidationToken();
      const result = await sendConfirmationEmail(token, user.email);
      res.status(200).send("Email sent.");
    }catch(e){
      res.status(500).send("Error: "+e.toString());
    }
    
})

module.exports = router;
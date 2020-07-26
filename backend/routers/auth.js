const express = require('express'),
      router = express.Router({mergeParams: true}),
      User = require('../models/user'),
      utils = require('../src/utils/utils')

// validate the user credentials
router.post('/auth/signin', async function (req, res) {
    const email = req.body.email;
    const pwd = req.body.password;
  
    console.log("signin: "+email+" "+pwd)
  
    try{
        const userFromDB = await User.findOne({ email: req.body.email });
        console.log("userFromDB.email: "+userFromDB.email+" userFromDB.password: "+userFromDB.password);
        if (!userFromDB)
        {
          console.error("Email/Password combination doesn't exist.");
          return res.status(404).json({
            error: true,
            message: "Email/Password combination doesn't exist."
          });
        }
        // return 400 status if email/password is not exist
        if (!email || !pwd) {
          console.error("Email or Password required.");
          return res.status(400).json({
            error: true,
            message: "Email or Password required."
          });
        }
  
        // return 401 status if the credential is not match.
        if (email !== userFromDB.email || pwd !== userFromDB.password) {
          console.error("Email or Password is Wrong.");
          return res.status(401).json({
          error: true,
            message: "Email or Password is Wrong."
          });
        }
  
        // generate token
        const token = utils.generateToken(userFromDB);
        // get basic user details
        const userObj = utils.getCleanUser(userFromDB);
        // return the token along with user details
        return res.json({ user: userObj, token });
    } catch(error) {
        console.error("Oops. There was an error. "+error.toString())
        return res.status(500).json({
          error: true,
          message: error.toString()
        });
    }
  });

//user confirmation by token
router.post('/auth/confirm', async (req,res) => {
    try{
      // Find a matching token
      Token.findOne({ token: req.body.token }, function (err, token) {
        if (!token) return res.status(400).json({ error: true, message: 'We were unable to find a valid token. Your token my have expired.' });
        // If we found a token, find a matching user
        User.findOne({ _id: token._userId, email: req.body.email }, function (err, user) {
            if (!user) return res.status(400).json({ error: true, message: 'We were unable to find a user for this token.' });
            if (user.confirmed) return res.status(400).json({ error: true, message: 'This user has already been verified.' });
            // Verify and save the user
            user.confirmed = true;
            user.save(function (err) {
                if (err) { return res.status(500).json({ error:true, message: err.message.toString() }); }
                res.status(200).send("The account has been verified. Please log in.");
            });
        });
      });
    } catch(e){
      res.status(500).json({error:true, message: e.toString()})
    }
})

module.exports = router;
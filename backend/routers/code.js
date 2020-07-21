const express = require('express'),
      router = express.Router({mergeParams: true}),
      Code = require('../models/code');

// API calls
router.post('/compile', async (req,res) => {
    const payload = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Token '+process.env.GLOT_IO_TOKEN
    }
    console.log("these are the headers: ");
    for (key in payload){
      console.log( key + ": " + payload[key]);
    }
    try{
      const result = await axios({
        method: 'post',
        url: 'https://run.glot.io/languages/cpp/latest',
        data: req.body,
        headers: payload
      });
      console.log(result);
      res.status(200).send(result.data);
    } catch(e){
      console.log("error "+e);
      res.status(500).send(e.message);
    }
    
});


// POST code
router.post('/codes', async (req,res) => {
    console.log(`REQUEST :: create code  ${req.body.mode}`);
    console.log(req.body);
  
    const newCode = {
      mode: req.body.mode,
      text: req.body.text
    };
  
  
    await Code.create(newCode)
            .then((resolve) => {
              console.log(`STATUS :: Success`);
              console.log(resolve);
              res.status(201).send(newCode);
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
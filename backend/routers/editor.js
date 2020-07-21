const express = require('express'),
      router = express.Router({mergeParams: true}),
      Editor = require('../models/editor');

// GET rich-text
router.get('/editors', async (req,res) => {
    try{
      const editors = await Editor.find({});
      return res.status(201).send(editors);
    } catch(error) {
      return res.status(500).json({
        error: true,
        message: e.toString()
      });
    }
  });
  
  // POST rich-text
  router.post('/editors', async (req,res) => {
    console.log(`REQUEST :: create editor  ${req.body.description}`);
  
    const newEditor = {
      description: req.body.description
    };
  
  
    await Editor.create(newEditor)
            .then((resolve) => {
              console.log(`STATUS :: Success`);
              console.log(resolve);
              res.status(201).send(newEditor);
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
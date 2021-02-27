const express = require('express'),
      router = express.Router({mergeParams: true}),
      Img = require('../models/img');

// POST user photo
router.post('/uploadPhoto', async(req, res) => {
    console.log(`REQUEST :: create user photo`);
    // console.log(req.body.img)
  
    const newImg = {
      data: req.body.img
    }
  
    await Img.create(newImg)
      .then((resolve) => {
        console.log(`STATUS :: Success`);
        res.status(201).send({buffer: newImg.data});
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
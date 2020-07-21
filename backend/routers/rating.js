const express = require('express'),
      router = express.Router({mergeParams: true}),
      Rating = require('../models/rating');


router.get("/ratings", async (req, res) => {
    res.set(201).send("TO-DO");
});

module.exports = router;
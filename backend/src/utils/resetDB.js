const User = require('../../models/user'),
      Editor = require('../../models/editor'),
      Img = require('../../models/img'),
      Rating = require('../../models/rating'),
      QBasic = require('../../models/qbasic'),
      QDetail = require('../../models/qbasic');

const mongoose = require('mongoose');


const resetDB = async () => {
    console.log("reseting db  *********************");

    await User.deleteMany({})
                .then(() => console.log("removed all users."))
                .catch((err) => console.error("error: could not remove users"));

    await Rating.deleteMany({})
                .then(() => console.log("removed all ratings."))
                .catch((err) => console.error("error: could not remove ratings"));

    await QDetail.deleteMany({})
                .then(() => console.log("removed all qdetails."))
                .catch((err) => console.error("error: could not remove qdetails"));

    await QBasic.deleteMany({})
                .then(() => console.log("removed all qbasics."))
                .catch((err) => console.error("error: could not remove qbasics"));

    await Editor.deleteMany({})
                .then(() => console.log("removed all editors."))
                .catch((err) => console.error("error: could not remove editors")); 
    
    await Img.deleteMany({})
                .then(() => console.log("removed all images."))
                .catch((err) => console.error("error: could not remove images"));
};


module.exports = resetDB;
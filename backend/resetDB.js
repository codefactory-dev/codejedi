const User = require('./models/user');
const Editor = require('./models/editor');
const Img = require('./models/img');
const mongoose = require('mongoose');


const resetDB = async () => {
    console.log("reseting db");

    await User.deleteMany({})
                .then(() => console.log("removed all users."))
                .catch((err) => console.error("error: could not remove users"));

    await Editor.deleteMany({})
                .then(() => console.log("removed all editors."))
                .catch((err) => console.error("error: could not remove editors")); 
    
    await Img.deleteMany({})
                .then(() => console.log("removed all images."))
                .catch((err) => console.error("error: could not remove images"));
};


module.exports = resetDB;
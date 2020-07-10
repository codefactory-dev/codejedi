const User = require('./models/user');
const Editor = require('./models/editor');
const mongoose = require('mongoose');


const resetDB = async () => {
    console.log("reseting db");

    await User.deleteMany({})
                .then(() => console.log("removed all users."))
                .catch((err) => console.error("error: could not remove users"));

    await Editor.deleteMany({})
                .then(() => console.log("removed all editors."))
                .catch((err) => console.error("error: could not remove editors"));            
};


module.exports = resetDB;
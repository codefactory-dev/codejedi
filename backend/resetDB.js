const User = require('./models/user');
const mongoose = require('mongoose');


const resetDB = async () => {
    console.log("reseting db");

    await User.remove({})
                .then(() => console.log("removed all users."))
                .catch((err) => console.error("error: could not remove users"));
};


module.exports = resetDB;
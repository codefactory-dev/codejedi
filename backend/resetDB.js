var User = require('./models/user');
var mongoose = require('mongoose');


let reset = async () => {
    console.log("reseting db");

    try {
        await User.remove({});
        console.log("removed all users"); 
    }
    catch(err) {
        console.log("error: could not remove users");
    };
};



module.exports = reset;
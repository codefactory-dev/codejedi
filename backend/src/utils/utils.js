const jwt = require("jsonwebtoken");
require("dotenv").config();
// generate token and return it
function generateToken(user) {
  //1. Don't use password and other sensitive fields
  //2. Use the information that are useful in other parts
  if (!user) return null;

  var u = {
    _id: user._id,
  };
  return (token = jwt.sign(u, process.env.JWT_SECRET, {
    expiresIn: 60 * 60 * 24, // expires in 24 hours
  }));
}

// return basic user details
function getCleanUser(user) {
  if (!user) return null;

  return {
    _id: user._id,
  };
}

function compareStringsByCharCode(string_1, string_2) {
  var ans = "";
  for (var c = 0; c < string_1.length; c++) {
    if (string_1.charCodeAt(c) != string_2.charCodeAt(c)) {
      console.log(
        "c:" + c + " " + string_1.charCodeAt(c) + "!=" + string_2.charCodeAt(c)
      );
      valid = false;
    }
  }
}

module.exports = {
  generateToken,
  getCleanUser,
  compareStringsByCharCode,
};

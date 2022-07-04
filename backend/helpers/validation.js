const User = require("../models/User");

/* VALIDATE EMAIL */
exports.validateEmail = (email) => {
  return email
    .toLowerCase()
    .match(/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,12})(\.[a-z]{2,12})?$/);
};

/* VALIDATE LENGTH */
exports.validateLength = (text, max, min) => {
  if (text.length > max || text.length < min) {
    return false;
  }
  return true;
};

/* VALIDATE USER NAME */
exports.validateUsername = async (username) => {
  let a = false;
  do {
    let check = await User.findOne({ username });
    if (check) {
      username += (+new Date() * Math.random()).toString().substring(0, 1);
      a = true;
    } else {
      a = false;
    }
  } while (a);
  return username;
};

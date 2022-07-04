const User = require("../models/User");
const jwt = require("jsonwebtoken");
const {
  validateEmail,
  validateLength,
  validateUsername,
} = require("../helpers/validation");
const bcrypt = require("bcrypt");
const { generateToken } = require("../helpers/tokens");
const { sendVerificationEmail } = require("../helpers/mailer");

const register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      username,
      password,
      email,
      bYear,
      bMonth,
      bDay,
      gender,
    } = req.body;

    /* VALIDATE EMAIL */
    if (!validateEmail(email)) {
      return res.status(400).json({
        message: "Invalid email address",
      });
    }
    const emailExists = await User.findOne({ email: email });
    if (emailExists) {
      return res.status(400).json({
        message: "Email address already exists",
      });
    }
    /* VALIDATE FIRST NAME LENGTH */
    if (!validateLength(first_name, 12, 3)) {
      return res.status(400).json({
        message:
          "First name must be at least 3 characters and not more than 12",
      });
    }
    /* VALIDATE LAST NAME LENGTH */
    if (!validateLength(last_name, 12, 3)) {
      return res.status(400).json({
        message: "Last name must be between 3 and 12 characters",
      });
    }
    /* VALIDATE PASSWORD LENGTH */
    if (!validateLength(password, 30, 8)) {
      return res.status(400).json({
        message: "Password must be between 8 and 30 characters",
      });
    }
    /* BCRYPT PASSWORD */
    const encryptedPassword = await bcrypt.hash(password, 12);
    /* HANDLE USERNAME */
    let tempUserName = first_name + last_name;
    let newUsername = await validateUsername(tempUserName);

    const user = await new User({
      first_name,
      last_name,
      username: newUsername,
      password: encryptedPassword,
      email,
      bYear,
      bMonth,
      bDay,
      gender,
    }).save();
    const emailVerificationToken = generateToken(
      { id: user._id.toString() },
      "30m",
    );
    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;

    sendVerificationEmail(user.email, user.first_name, url);

    const token = generateToken({ id: user._id.toString() }, "7d");
    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verified: user.verified,
      message:
        "Registration successful, please check your email to activate your account",
    });

    //res.json(user);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const activateAccount = async (req, res) => {
  try {
    const { token } = req.body;
    const user = jwt.verify(token, process.env.SECRET_TOKEN);
    const check = await User.findById(user.id);
    if (check.verified === true) {
      return res.status(400).json({
        message: "This account is already activated",
      });
    } else {
      await User.findByIdAndUpdate(user.id, { verified: true });
      return res.status(200).json({
        message: "Account has been activated successfully",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "The email address you entered is not connected to an account",
      });
    }
    const check = await bcrypt.compare(password, user.password);
    if (!check) {
      return res.status(400).json({
        message: "Invalid credentials, please try again",
      });
    }
    const token = generateToken({ id: user._id.toString() }, "7d");
    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verified: user.verified,
      message:
        "Registration successful, please check your email to activate your account",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = { register, activateAccount, login };

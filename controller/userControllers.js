const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// @desc - will create a new user
// @access public
const register = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }
  const findUser = await User.findOne({ email: email });
  console.log(findUser);
  if (findUser) {
    res.status(400);
    throw new Error("User already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword);
  const userReg = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  if (userReg) {
    res.status(201).json({ _id: userReg.id, email: userReg.email });
  } else {
    res.status(400);
    throw new Error("User is not valid");
  }
});

// @desc - will return a access token to access all the contacts.
// @access public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const findUser = await User.findOne({ email: email });
  console.log(findUser);
  if (findUser && (await bcrypt.compare(password, findUser.password))) {
    const accessToken = jwt.sign(
      { username: findUser.username, email: findUser.email, id: findUser.id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).send({ accessToken });
  } else {
    res.status(400);
    throw new Error("Email or password is incorrect!");
  }
});

// @desc get the currect user info
// @access private
const current = asyncHandler(async (req, res) => {
  res.status(200).send(req.user);
});

module.exports = { login, register, current };

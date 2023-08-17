const express = require("express");
const router = express.Router();
const { current, register, login } = require("../controller/userControllers");
const validate = require("../middleware/validateHandler");

router.post("/login", login);

router.post("/register", register);

router.post("/current", validate, current);

module.exports = router;

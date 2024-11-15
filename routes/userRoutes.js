const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logOut,
} = require("../controllers/userControllers");
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logOut);
module.exports = router;

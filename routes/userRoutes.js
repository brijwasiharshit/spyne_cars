const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logOut,
  getSingleUser,
} = require("../controllers/userControllers");
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/getSingleUser/:id").get(getSingleUser);
router.route("/logout").get(logOut);
module.exports = router;
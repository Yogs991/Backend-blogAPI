const express = require("express");
const {Router} = require("express");
const router = express.Router();
const passport = require("passport");
const userController = require("../controllers/userController");

router.post("/api/signup", userController.signUpUser);
router.post("/api/login", userController.verifyToken, userController.getUserFromDb);

module.exports = router;
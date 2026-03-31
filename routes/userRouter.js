const express = require("express");
const {Router} = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController");
const validator = require("../utils/validators");
const authToken = require("../utils/token");


userRouter.get("/me", authToken.verifyToken, userController.getCurrentUser);
//post route for log in
userRouter.post("/login", authToken.verifyToken, validator.loginValidation, userController.userLogin);
//post route for sign up 
userRouter.post("/register", validator.registerValidation, userController.userSignUp);
//get route for all posts by user
userRouter.get("/:userId/posts", userController.allPostsByUser);
//get route for a single post by user
userRouter.get("/:userId/posts/:postId", userController.getSinglePostByUser);
//admin get all users
userRouter.get("/", userController.getAllUsers);
//delete a user
userRouter.get("/:userId",userController.deleteUser);

module.exports = userRouter;
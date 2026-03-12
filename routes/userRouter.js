const express = require("express");
const {Router} = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController");
const authToken = require("../utils/token");

//post route for log in
userRouter.post("/", authToken.verifyToken, userController.userLogin);
//post route for sign up 
userRouter.post("/", userController.userSignUp);
//get route for all posts by user
userRouter.get("/:id/posts", userController.allPostsByUser);
//get route for a single post by user
userRouter.get("/:id/posts/:postId", userController.getSinglePostByUser);

module.exports = userRouter;
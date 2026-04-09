const express = require("express");
const {Router} = require("express");
const postRouter = express.Router();
const postController = require("../controllers/postController");
const authToken = require("../utils/token");
const validator = require("../utils/validators");

postRouter.get("/", postController.getAllPosts);
postRouter.get("/:id", postController.getCertainPost);
postRouter.post("/", authToken.verifyToken, validator.createPostValidation, postController.createPost);
postRouter.put("/:id", authToken.verifyToken, validator.updatePostValidation, postController.editPost);
postRouter.delete("/:id", authToken.verifyToken, postController.deletePost);

module.exports = postRouter;
const express = require("express");
const {Router} = require("express");
const postRouter = express.Router();
const postController = require("../controllers/postController");
const authToken = require("../utils/token");
const validator = require("../utils/validators");

postRouter.get("/", postController.getAllPosts);
postRouter.get("/:postId", postController.getCertainPost);
postRouter.post("/", authToken.verifyToken, validator.createPostValidation, postController.createPost);
postRouter.put("/:postId", authToken.verifyToken, validator.updatePostValidation, postController.editPost);
postRouter.delete("/:postId", authToken.verifyToken, postController.deletePost);
postRouter.get("/:postId/comments", postController.getCommentsForPost);
postRouter.get("/:postId/comments/:commentId", postController.getCommentById);

module.exports = postRouter;
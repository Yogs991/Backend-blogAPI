const express = require("express");
const {Router} = require("express");
const commentRouter = express.Router();
const commentController = require("../controllers/commentController");
const authToken = require("../utils/token");
const validator = require("../utils/validators");

commentRouter.get("/:postId/comments", commentController.getCommentsForPost);
commentRouter.get("/:postId/comments/:commentId", commentController.getCommentById);
commentRouter.post("/:postId/comments", authToken.verifyToken, validator.createCommentValidation, commentController.addComment);
commentRouter.put("/:postId/comments/:commentId", authToken.verifyToken, validator.updateCommentValidation, commentController.updateComment);
commentRouter.delete("/:postId/comments/:commentId", authToken.verifyToken, commentController.deleteComment);

module.exports = commentRouter;
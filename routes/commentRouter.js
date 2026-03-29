const express = require("express");
const {Router} = require("express");
const commentRouter = express.Router();
const commentController = require("../controllers/commentController");
const validator = require("../utils/validators");


// => /api/comments/postId/comments
commentRouter.get("/:postId/comments", commentController.getCommentsForPost);
commentRouter.get("/:postId/comments/:commentId", commentController.getCommentById);
commentRouter.post("/:postId/comments", validator.createCommentValidation, commentController.addComment);
commentRouter.put("/:postId/comments/:commentId", validator.updateCommentValidation, commentController.updateComment);
commentRouter.delete("/:postId/comments/:commentId", commentController.deleteComment);

module.exports = commentRouter;
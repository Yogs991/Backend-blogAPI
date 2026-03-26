const express = require("express");
const {Router} = require("express");
const commentRouter = express.Router();
const commentController = require("../controllers/commentController");
const validator = require("../utils/validators");

commentRouter.get("/:id/comments", commentController.getCommentsForPost);
commentRouter.get("/:id/comments/:commentId", commentController.getCommentById);
commentRouter.post("/:id/comments", validator.createCommentValidation, commentController.addComment);
commentRouter.put("/:id/comments/:commentId", validator.updateCommentValidation, commentController.updateComment);
commentRouter.delete("/:id/comments/:commentId", commentController.deleteComment);

module.exports = commentRouter;
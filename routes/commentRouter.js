const express = require("express");
const {Router} = require("express");
const commentRouter = express.Router();
const commentController = require("../controllers/commentController");

commentRouter.get("/:id/comments", commentController.getCommentsForPost);
commentRouter.get("/:id/comments/:commentId", commentController.getCommentById);
commentRouter.post("/:id/comments", commentController.addComment);
commentRouter.put("/:id/comments/:commentId", commentController.updateComment);
commentRouter.delete("/:id/comments/:commentId", commentController.deleteComment);

module.exports = commentRouter;
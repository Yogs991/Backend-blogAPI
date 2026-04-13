const express = require("express");
const {Router} = require("express");
const commentRouter = express.Router();
const commentController = require("../controllers/commentController");
const authToken = require("../utils/token");
const validator = require("../utils/validators");

commentRouter.post("/:postId", authToken.verifyToken, validator.createCommentValidation, commentController.addComment);
commentRouter.put("/:postId/comment/:commentId", authToken.verifyToken, validator.updateCommentValidation, commentController.updateComment);
commentRouter.delete("/:postId/comment/:commentId", authToken.verifyToken, commentController.deleteComment);

module.exports = commentRouter;
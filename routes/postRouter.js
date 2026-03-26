const express = require("express");
const {Router} = require("express");
const postRouter = express.Router();
const postController = require("../controllers/postController");
const validator = require("../utils/validators");

postRouter.get("/", postController.getAllPosts);
postRouter.get("/:id", postController.getCertainPost);
postRouter.post("/",validator.createPostValidation, postController.createPost);
postRouter.put("/:id",validator.updatePostValidation, postController.editPost);
postRouter.delete("/:id", postController.deletePost);

module.exports = postRouter;
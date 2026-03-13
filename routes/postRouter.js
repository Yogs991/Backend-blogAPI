const express = require("express");
const {Router} = require("express");
const postRouter = express.Router();
const postController = require("../controllers/postController");

postRouter.get("/", postController.getAllPosts);
postRouter.get("/:id", postController.getCertainPost);
postRouter.post("/", postController.createPost);
postRouter.put("/:id", postController.editPost);
postRouter.delete("/:id", postController.deletePost);

module.exports = postRouter;
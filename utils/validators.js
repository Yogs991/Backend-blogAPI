const {body} = require("express-validator");

const registerValidation = [
    body("name").trim().notEmpty().withMessage('Name is required').escape(),
    body("email").trim().isEmail().withMessage("Email is required").toLowerCase().escape(),
    body("password").isLength({min: 8}).withMessage("Password is required")
];

const loginValidation = [
    body("email").trim().isEmail().withMessage("Email is required"),
    body("password").notEmpty().withMessage("Password is required")
];

const createPostValidation = [
    body("title").trim().isLength({min: 3, max: 200}).withMessage("Title is required"),
    body("content").trim().isLength({min: 1}).withMessage("Content is required")
];

const updatePostValidation = [
    body("title").optional().trim().isLength({min: 3, max: 200}).withMessage("Title is required"),
    body("content").optional().trim().isLength({min: 1}).withMessage("Content is required")
];

const createCommentValidation = [
    body("content").trim().isLength({min: 1, max: 2000}).withMessage("Comment can't be empty or longer than 2000 characters")
];

const updateCommentValidation = [
    body("content").trim().isLength({min: 1, max: 2000}).withMessage("Comment can't be empty or longer than 2000 characters")
];

module.exports = {
    registerValidation,
    loginValidation,
    createPostValidation,
    updatePostValidation,
    createCommentValidation,
    updateCommentValidation
}
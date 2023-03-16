const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const createPostController = require("../controllers/blog");
const commentController = require("../controllers/comment");

const { isAuthenticatedUser } = require("../middleware/auth");

// Blog route /blog/ POST -> Create
// router.post("/blog", createPostController.createPost);
router
  .route("/blog")
  .post(isAuthenticatedUser, createPostController.createBlog);

router.route("/blog/:blogId").get(createPostController.getSingleBlog);

router
  .route("/blog/:id")
  .put(isAuthenticatedUser, createPostController.updateBlog);

router
  .route("/blog/:id")
  .delete(isAuthenticatedUser, createPostController.deleteBlog);

// Blog route /blog/ GET -> To get Blogs
router.route("/blog").get(createPostController.getAllBlog);

// Blog route /blog/ GET -> To get Blogs
router
  .route("/my-blog")
  .get(isAuthenticatedUser, createPostController.getUserBlog);

// Comment Routes
router.post(
  "/comments/:blogId",
  isAuthenticatedUser,
  commentController.createComment
);

router.get(
  "/comments/:blogId",
  isAuthenticatedUser,
  commentController.getCommentsByBlogId
);

module.exports = router;

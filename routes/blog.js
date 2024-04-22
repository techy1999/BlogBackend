const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const createPostController = require("../controllers/blog");
const commentController = require("../controllers/comment");
const likeBlogController = require("../controllers/like");

const { isAuthenticatedUser } = require("../middleware/auth");
const { rateLimiter } = require("../middleware/rateLimiter");
// Blog route /blog/ POST -> Create
// router.post("/blog", createPostController.createPost);
router
  .route("/blog")
  .post(rateLimiter,isAuthenticatedUser, createPostController.createBlog);

router.route("/blog/:blogId").get(rateLimiter,createPostController.getSingleBlog);

router
  .route("/blog/:id")
  .put(isAuthenticatedUser, createPostController.updateBlog);

router
  .route("/blog/:id")
  .delete(rateLimiter,isAuthenticatedUser, createPostController.deleteBlog);

// Blog route /blog/ GET -> To get Blogs
router.route("/blog").get(createPostController.getAllBlog);

// Blog route /blog/ GET -> To get Blogs
router
  .route("/my-blog")
  .get(rateLimiter,isAuthenticatedUser, createPostController.getUserBlog);

// Like a blog
router
  .route("/blog/like/:id")
  .put(rateLimiter,isAuthenticatedUser, likeBlogController.likeBlog);

// Comment Routes
router.post(
  "/comments/:blogId",
  rateLimiter,
  isAuthenticatedUser,
  commentController.createComment
);

router.get(
  "/comments/:blogId",
  rateLimiter,
  isAuthenticatedUser,
  commentController.getCommentsByBlogId
);

module.exports = router;
